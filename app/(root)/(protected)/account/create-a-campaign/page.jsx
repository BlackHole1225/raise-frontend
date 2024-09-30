'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Ensure axios is imported
import RichTextEditor from '@/components/ui/richTextEditor';
import DragDropUpload from '@/components/ui/dragDropUpload';
import { Input } from '@nextui-org/input';
import { Autocomplete, AutocompleteItem } from '@nextui-org/autocomplete';
import { Button } from '@nextui-org/button';
import { SERVER_IP } from '../../../../../utils/constants';
import { FSERVER_IP } from '../../../../../utils/constants';
require('@coral-xyz/anchor');

import { TESTNET } from '../../../../../utils/constants';
require('@coral-xyz/anchor');

console.log('>>> connected to ', TESTNET);
// const connection = new Connection(TESTNET);

function GetClientSideStorage(key) {
  let value = '';
  useEffect(() => {
    value = localStorage.getItem(key);
  }, [key]);
  return value;
}

const Page = () => {
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [camImgFile, setCamImgFile] = useState(null);
  const [category, setCategory] = useState();
  const [location, setLocation] = useState();
  const [amount, setAmount] = useState();
  const [campaignImage, setCampaignImage] = useState();
  const [proofDocuments, setProofDocuments] = useState([]);
  const [campaignTitle, setCampaignTitle] = useState('');
  const [description, setDescription] = useState('');
  // const [campaignImageIds, setCampaignImageId] = useState();
  const [proofDocumentIds, setProofDocumentIds] = useState([]);

  const [wallet, setWallet] = useState(null);
  // const [balance, setBalance] = useState(null);

  // const userID = window.localStorage.getItem('userID');
  const userID = GetClientSideStorage('userID');

  useEffect(() => {
    setDescription('');
  }, []);

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
  const getInnerText = (html) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || '';
  };

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

  const onHandleContent = (e) => {
    console.log(e.target.value);
  };

  const uploadFile = async (files) => {
    const formData = new FormData();

    // If multiple files, append them
    if (Array.isArray(files)) {
      files.forEach((file, index) => formData.append('file_' + index, file));
    } else {
      formData.append('files', files); // Single file
    }

    try {
      const response = await axios.post(`${FSERVER_IP}/api/file/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // Ensure the response contains the uploaded file information
      const uploadedFiles = response.data.uploaded;
      console.log('Uploaded Files:', uploadedFiles);

      if (uploadedFiles != undefined) {
        // Map the file IDs
        const fileIds = uploadedFiles.map((file) => file._id);
        return fileIds;
      }
    } catch (error) {
      console.error('Error uploading files:', error);
      throw error;
    }
  };
  // Function to handle the campaign image upload
  const handleCamImg = (img) => {
    setCampaignImage(img);
    if (typeof window !== 'undefined' && img != undefined) {
      const campaignImgReader = new FileReader();
      campaignImgReader.onloadend = function () {
        setCamImgFile(campaignImgReader.result);
      };
      campaignImgReader.readAsDataURL(img); // Trigger onloadend
    }
  };

  const handleSubmit = async () => {
    console.log('>>> clicked Send For KYC ');
    await handleConnectWallet();
    try {
      // Upload campaign image
      // if (campaignImage != undefined) {
      //   const campaignImageIds = await uploadFile(campaignImage);
      //   setCampaignImageId(campaignImageIds[0]); // Assuming there's only one campaign
      //   console.log(campaignImageIds);
      // }

      if (campaignImage == undefined) {
        setCamImgFile(null);
      }

      if (proofDocuments != undefined) {
        // Debugging: Check if proofDocuments contains files
        // console.log("Proof Documents:", proofDocuments);

        // Upload proof documents and get their IDs
        const proofDocumentIds = await uploadFile(proofDocuments);
        setProofDocumentIds(proofDocumentIds);

        console.log('Proof Document IDs:', proofDocumentIds);
      }
      // if (!validateInputs()) {
      //   alert("All fields must be filled!");
      //   return;
      // }
      // Prepare form data
      // if(campaignImageIds != undefined){
      //   fileCampaign = campaignImageIds[0];
      // }
      // proofDocumentReader.readAsDataURL(proofDocuments)

      console.log('ddesr', description);

      const formData = {
        title: campaignTitle,
        categoryId: category,
        countryId: location,
        amount: amount,
        // file: fileCampaign,
        file: camImgFile,
        kyc: proofDocumentIds,
        text: getInnerText(description),
        createrId: userID,
        totalAmount: '0'
      };

      console.log(formData);

      // Send form data to the server
      const response = await axios.post(`${SERVER_IP}/api/campaign/create`, formData);
      console.log('Campaign created successfully:', response.data);

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
        Create a Campaign
      </h1>
      <div className="grid grid-cols-2 gap-8 mb-4">
        <div className="flex flex-col gap-5">
          <Input
            variant="bordered"
            label="Campaign Title"
            radius="sm"
            value={campaignTitle}
            onChange={(e) => setCampaignTitle(e.target.value)}
          />
          <Autocomplete
            label="Where will your funds go? (Country)"
            variant="bordered"
            radius="sm"
            onSelectionChange={(key) => {
              setLocation(key);
            }}>
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
            }}>
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
            onChange={(e) => setAmount(e.target.value)}
            endContent={<p className="font-heading text-xl text-brand-dark">SOL</p>}
          />
          <DragDropUpload
            acceptedFormats={{
              'image/*': ['.jpeg', '.png', '.jpg', '.gif']
            }}
            isMultiple={false}
            label="Campaign Image"
            onChange={(files) => handleCamImg(files[0])}
          />
        </div>
        <RichTextEditor
          value="{description}"
          onClick={onHandleContent}
          placeholder="Hello Everyone, We are raising funds for..........."
        />
        <div className="col-span-2">
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
