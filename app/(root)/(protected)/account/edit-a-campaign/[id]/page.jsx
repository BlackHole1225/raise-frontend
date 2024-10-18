'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Ensure axios is imported
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { Input } from '@nextui-org/input';
import { Autocomplete, AutocompleteItem } from '@nextui-org/autocomplete';
import { Button } from '@nextui-org/button';
import DragDropUpload from '@/components/ui/dragDropUpload';
import { notifySuccess } from '@/components/notification';
import { SERVER_IP } from '@/utils/constants';
import { SERVER_LOCAL_IP } from '@/utils/constants';
import 'react-quill/dist/quill.snow.css';
require('@coral-xyz/anchor');

import { TESTNET } from '@/utils/constants';
require('@coral-xyz/anchor');

console.log('>>> connected to ', TESTNET);
// const connection = new Connection(TESTNET);


const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
const modules = {
  toolbar: {
    container: [
      [{ 'size': ['small', false, 'large', 'huge'] }],
      ['bold', 'italic'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['image'],
      ['blockquote'],
      ['calendar']
    ],
  }
};
const Page = ({ params }) => {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [camImgFile, setCamImgFile] = useState(null);
  const [category, setCategory] = useState();
  const [location, setLocation] = useState();
  // const [amount, setAmount] = useState();
  const [campaignImage, setCampaignImage] = useState(null);
  const [proofDocuments, setProofDocuments] = useState([]);

  // const [campaignTitle, setCampaignTitle] = useState('');
  const [campaignData, setCampaignData] = useState(null);
  // const [campaignImageIds, setCampaignImageId] = useState();

  const [wallet, setWallet] = useState(null);
  // const [balance, setBalance] = useState(null);

  // const userID = window.localStorage.getItem('userID');
  // const userID = GetClientSideStorage('userID');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const campaignsRes = await axios.get(`${SERVER_LOCAL_IP}/api/campaign/${params.id}`);
        setCampaignData({ ...campaignsRes.data.data.campaign }); // Assuming the response has "data"
        console.log('Fetched Campaign:', campaignsRes.data.data.campaign);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch campaign data');
      } finally {
        setLoading(false); // Whether success or failure, loading stops
      }
    };
    fetchData();
  }, [params.id]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [categoriesRes, locationsRes] = await Promise.all([
          axios.get(`${SERVER_IP}/api/category`),
          axios.get(`${SERVER_IP}/api/location`)
        ]);

        setCategories(categoriesRes.data.category || []);
        setLocations(locationsRes.data.country || []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Helper function to extract plain text from HTML
  // const getInnerText = (html) => {
  //   const tempDiv = document.createElement('div');
  //   tempDiv.innerHTML = html;
  //   return tempDiv.textContent || tempDiv.innerText || '';
  // };

  const handleConnectWallet = async () => {
    if (!wallet) {
      if ('solana' in window) {
        const provider = window.solana;
        if (provider.isPhantom) {
          await provider.disconnect();
          try {
            const response = await provider.connect();
            setWallet(response.publicKey.toString());
            console.log('>>> wallet in create campaign : ', wallet);
          } catch (error) {
            console.error('Error connecting to Phantom wallet:', error);
          }
        }
      } else {
        window.open('https://phantom.app/', '_blank');
      }
    }
  };

  // const validateInputs = () => {
  //   if (
  //     !campaignTitle ||
  //     !category ||
  //     !location ||
  //     !amount ||
  //     !campaignImage ||
  //     !description ||
  //     proofDocuments.length === 0
  //   ) {
  //     return false;
  //   }
  //   return true;
  // };


  const uploadFile = async () => {
    const formData = new FormData();
    Array.from(campaignImage).forEach(f => {
      formData.append('files', f);
    });

    try {
      const response = await axios.post(`${SERVER_LOCAL_IP}/api/file/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // Ensure the response contains the uploaded file information
      const uploadedFiles = response.data.uploaded;
      console.log('Uploaded Files:', uploadedFiles);

      if (uploadedFiles != undefined) {
        // Map the file IDs
        const avatar = uploadedFiles[0]?.imgUrl;
        return avatar;
      }
    } catch (error) {
      console.error('Error uploading files:', error);
      throw error;
    }
  };
  // Function to handle the campaign image upload



  const handleSubmit = async () => {
    console.log('>>> clicked Send For KYC ');
    await handleConnectWallet();
    try {
      const proofDocumentId = await uploadFile(proofDocuments);
      const file = await uploadFile(campaignImage);
      // Send form data to the server
      await axios.put(`${SERVER_LOCAL_IP}/api/campaign/edit`, { ...campaignData, file, kyc: proofDocumentId, categoryId: category, countryId: location }, {
        headers: {
          Authorization: `Bearer ${localStorage?.getItem("authToken")}`, // JWT token for auth
        },
      });
      notifySuccess("Campaign updated successfully");
      router.push('/campaigns');
      // if (!wallet || !amount) await handleConnectWallet();
      // console.log(">>> wallet publickey : ", wallet);
      // try {
      //   let creator = new PublicKey(wallet);
      //   let goal = new BN(100 * LAMPORTS_PER_SOL);
      //   let campaginDuration = new BN(30 * 24 * 60 * 60); // 30 days
      //   let minDepositAmount = new BN(1 * LAMPORTS_PER_SOL);
      //   let campaign = PublicKey.findProgramAddressSync([Buffer.from('campaign'), creator.toBuffer()], idl.metadata.address);
      //   let campaignAuthority = PublicKey.findProgramAddressSync([Buffer.from('campaign_authority')], idl.metadata.address);

      //   const provider = new AnchorProvider(
      //     connection,
      //     new Wallet(Keypair.generate()),
      //     { commitment: 'processed' }
      //   );
      //   const program = new Program(
      //     idl,
      //     idl.metadata.address,
      //     provider
      //   );

      //   const raiseContract = RaiseContractImpl.create(TESTNET);
      //   let { txId } = await raiseContract.initializeCampaign(
      //     goal,
      //     campaginDuration,
      //     minDepositAmount,
      //     creator
      //   );

      //   console.log(">>> transaction : ", txId)

      //   alert("Create campaign successful!");
      // } catch (error) {
      //   console.error("Error creating campaign:", error);
      //   alert("Creating campaign failed. Please try again.");
      // }

      //   console.log(">>> connected to ", connection);
      //   console.log(">>> wallet to ", wallet);
      //   await handleConnectWallet();
      //   if (!wallet) return;
      //   await updateBalance(wallet, connection); // Use state connection

      //   const fee = parseFloat(0.0001) * LAMPORTS_PER_SOL;
      //   const recipient = new PublicKey("3JKwidu2bmNhBcJs62TxHHaaFn98rdtNGcprRSd7pEMT"); // Replace with actual recipient address

      //   try {
      //     const transaction = new Transaction().add(
      //       SystemProgram.transfer({
      //         fromPubkey: new PublicKey(wallet),
      //         toPubkey: recipient,
      //         lamports: fee,
      //       })
      //     );

      //     const { blockhash } = await connection.getLatestBlockhash();
      //     transaction.recentBlockhash = blockhash;
      //     transaction.feePayer = new PublicKey(wallet);

      //     console.log(">>> transaction : ", transaction)

      //     const signed = await window.solana.signTransaction(transaction);
      //     const signature = await connection.sendRawTransaction(signed.serialize());
      //     await connection.confirmTransaction(signature);

      //     alert("Creating campagin successful!");
      //   } catch (error) {
      //     console.error("Error creating campaign:", error);
      //     alert("creating camgaign failed. Please try again.");
      //   }
    } catch (error) {
      console.error('Submission failed:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Add a loading state
  }

  if (error) {
    return <div>Error loading data</div>; // Add an error state
  }
  return (
    <div className="pb-8">
      <h1 className="uppercase text-5xl font-bold text-brand-dark mb-8 font-heading">
        Edit a Campaign
      </h1>
      <div className="md:grid md:grid-cols-2 gap-8 mb-4">
        <div className="flex flex-col gap-5">
          <Input
            variant="bordered"
            label="Campaign Title"
            radius="sm"
            value={campaignData?.title}
            onChange={(e) => setCampaignData({ ...campaignData, title: e.target.value })}
          />
          <Autocomplete
            label="Where will your funds go? (Country)"
            variant="bordered"
            radius="sm"
            onSelectionChange={(key) => {
              setLocation(key);
            }}
          >
            {locations.map((item) => (
              <AutocompleteItem key={item._id} value={item.name}>
                {item.name}
              </AutocompleteItem>
            ))}
          </Autocomplete>
          <Autocomplete
            label="Why are you raising funds? (Category)"
            variant="bordered"
            radius="sm"
            onSelectionChange={(key) => {
              setCategory(key);
            }}
          >
            {categories.map((item) => (
              <AutocompleteItem key={item._id} value={item.name}>
                {item.name}
              </AutocompleteItem>
            ))}
          </Autocomplete>
          <Input
            variant="bordered"
            label="How much fund do you want to raise? (Goal)"
            radius="sm"
            onChange={(e) => setCampaignData({ ...campaignData, amount: e.target.value })}
            endContent={<p className="font-heading text-sm xl:text-xl text-brand-dark">SOL</p>}
          />
          <DragDropUpload
            acceptedFormats={{
              'image/*': ['.jpeg', '.png', '.jpg', '.gif']
            }}
            label="Campaign Image"
            onChange={(e) => setCampaignImage(e)}
            isMultiple={true}
          />
        </div>
        <div className="quill-container rounded-lg border border-brand-olive-green mt-3">
          <ReactQuill
            theme="snow"
            value={campaignData?.content[0]?.text}
            onChange={(e) => setCampaignData({ ...campaignData, content: [{ ...campaignData?.content[0], text: e }] })}
            modules={modules}
          />
        </div>
        <div className="col-span-2 mt-8 md:mt-0">
          <DragDropUpload
            acceptedFormats={{
              'image/*': ['.jpeg', '.png', '.jpg', '.gif'],
              'application/*': ['.pdf']
            }}
            isMultiple={true}
            label="Proof Document"
            onChange={(files) => setProofDocuments(files)}
          />
        </div>
      </div>
      <div className="flex justify-end">
        <Button
          variant="solid"
          radius="full"
          size="lg"
          className="font-medium bg-brand-olive-green border-brand-olive-green text-white"
          onClick={handleSubmit}>
          Send For KYC
        </Button>
      </div>
    </div>
  );
};

export default Page;
