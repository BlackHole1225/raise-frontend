'use client';
import { Checkbox } from '@nextui-org/checkbox';
import { Input, Textarea } from '@nextui-org/input';
import React, { useState, useEffect } from 'react';
import {
  Connection,
  PublicKey,
  Transaction,
  SystemProgram,
  LAMPORTS_PER_SOL
} from '@solana/web3.js';
import { Button } from '@nextui-org/button';
import { TESTNET } from '../../../../utils/constants';

const DonateNowComp = ({ isSubmitted, setSubmitted }) => {
  const [wallet, setWallet] = useState(null);
  const [balance, setBalance] = useState(null);
  const [amount, setAmount] = useState('');

  const [connection, setConnection] = useState(null); // Connection now part of state

  useEffect(() => {
    // const connectWallet = async () => {
    //     if ("solana" in window) {
    //         const provider = window.solana;
    //         if (provider.isPhantom) {
    //             try {
    //                 const response = await provider.connect({ onlyIfTrusted: true });
    //                 setWallet(response.publicKey.toString());
    //                 await updateBalance(response.publicKey);
    //             } catch (error) {
    //                 console.error("Error connecting to Phantom wallet:", error);
    //             }
    //         }
    //     }
    // };

    // connectWallet();

    // Initialize the connection in the global state
    const newConnection = new Connection(TESTNET, 'confirmed');
    setConnection(newConnection); // Set connection to state
    console.log('>>> in useEffect Connected to', newConnection);

    if (typeof window !== 'undefined') {
      // Optionally auto-connect Phantom if available
      if ('solana' in window) {
        const provider = window.solana;
        if (provider.isPhantom) {
          provider
            .connect({ onlyIfTrusted: true })
            .then((response) => {
              setWallet(response.publicKey.toString());
              console.log('>>> wallet in DonateNowComp : ', wallet);
              updateBalance(response.publicKey, newConnection);
            })
            .catch((error) => {
              console.error('Auto-connect to Phantom failed:', error);
            });
        }
      }
    }
  }, []);

  const updateBalance = async (publicKey) => {
    console.log('>>> in updateBalance Connected to', connection);
    try {
      const balance = await connection.getBalance(new PublicKey(publicKey));
      setBalance(balance / LAMPORTS_PER_SOL);
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  };

  const handleConnectWallet = async () => {
    // console.log('>>> Connected to', connection.clusterApiUrl);
    if (!wallet && 'solana' in window) {
      const provider = window.solana;
      if (provider.isPhantom) {
        try {
          const response = await provider.connect();
          setWallet(response.publicKey.toString());
          await updateBalance(response.publicKey, connection); // Use state connection
        } catch (error) {
          console.error('Error connecting to Phantom wallet:', error);
        }
      } else {
        window.open('https://phantom.app/', '_blank');
      }
    }
  };

  const handleDonate = async (e) => {
    console.log('>>> --- handleDonate ---')
    await handleConnectWallet()
    e.preventDefault();
    await updateBalance(wallet, connection); // Use state connection
    if (!wallet || !amount) return;

    const donationAmount = parseFloat(amount) * LAMPORTS_PER_SOL;
    const recipient = new PublicKey('3JKwidu2bmNhBcJs62TxHHaaFn98rdtNGcprRSd7pEMT'); // Replace with actual recipient address

    try {
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: new PublicKey(wallet),
          toPubkey: recipient,
          lamports: donationAmount
        })
      );

      const { blockhash } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = new PublicKey(wallet);

      console.log('>>> transaction : ', transaction);

      const signed = await window.solana.signTransaction(transaction);
      const signature = await connection.sendRawTransaction(signed.serialize());
      await connection.confirmTransaction(signature);

      alert('Donation successful!');
      await updateBalance(wallet);
      setAmount('');
    } catch (error) {
      console.error('Error making donation:', error);
      alert('Donation failed. Please try again.');
    }

    setSubmitted();
  };
  return (
    <div>
      <section className="mt-7 flex gap-5">
        <CampaignImage />
        <CampaignDetails />
      </section>
      <hr className="border-brand-olive-green opacity-40 my-4" />
      {isSubmitted ? (
        <div>
          <div className="flex items-center gap-4 mb-8 flex-col mt-6">
            <svg
              width="80"
              height="80"
              viewBox="0 0 80 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="80" height="80" rx="40" fill="#3D4630" />
              <path
                d="M24.25 42.25L34.75 52.75L55.75 30.25"
                stroke="#FAFF7D"
                strokeWidth="4.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="text-base font-bold tracking-wider text-brand-olive-green">
              Donation Received{' '}
            </p>
          </div>
          <p className="text-base font-bold tracking-wider text-olive-green mb-6">
            Thanks you Mr. Donor for helping our camp in saving rare species of tigers.
            <br />
            Transaction Hash- 34jkl.............4343
            <br />
            We guarantee you a full refund for up to a year in the rare case that fraud occurs.
          </p>
          <Textarea
            variant="bordered"
            label="Add Word Of Support..."
            radius="sm"
            className="mb-5"
            classNames={{
              inputWrapper: 'border border-brand-olive-green'
            }}
          />
          <div className="flex justify-end">
            <Button
              variant="solid"
              radius="full"
              size="sm"
              className="mb-4 font-medium bg-brand-olive-green border-brand-olive-green text-brand-lemon-yellow xl:py-6 xl:px-7"
            >
              Submit
            </Button>
          </div>
        </div>
      ) : (
        <>
          <DonationForm
            wallet={wallet}
            balance={balance}
            amount={amount}
            setAmount={setAmount}
            onConnectWallet={handleConnectWallet}
            onDonate={handleDonate}
          />
          <footer className="mt-6">
            <p className="text-base font-bold tracking-wider text-olive-green">
              We guarantee you a full refund for up to a year in the rare case that fraud occurs.
            </p>
          </footer>
        </>
      )}
    </div>
  );
};

// ... (CampaignImage and CampaignDetails components remain unchanged)

const DonationForm = ({ wallet, balance, amount, setAmount, onConnectWallet, onDonate }) => (
  <form>
    <div className="mb-4">
      <button
        type="button"
        onClick={onConnectWallet}
        className="w-full p-4 flex justify-between items-center rounded-lg border border-olive-green text-xl font-bold text-olive-green"
      >
        {wallet ? `Connected: ${wallet.slice(0, 4)}...${wallet.slice(-4)}` : 'Connect Wallet'}
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 7.42927H17.7143C18.3205 7.42927 18.9019 7.67008 19.3305 8.09874C19.7592 8.52739 20 9.10877 20 9.71498V16.5721C20 17.1783 19.7592 17.7597 19.3305 18.1884C18.9019 18.617 18.3205 18.8578 17.7143 18.8578H6.28571C5.67951 18.8578 5.09812 18.617 4.66947 18.1884C4.24082 17.7597 4 17.1783 4 16.5721V7.42927ZM4 7.42927H16.5714V6.28641C16.5714 5.98331 16.451 5.69262 16.2367 5.47829C16.0224 5.26396 15.7317 5.14355 15.4286 5.14355H5.14286C4.83975 5.14355 4.54906 5.26396 4.33474 5.47829C4.12041 5.69262 4 5.98331 4 6.28641V7.42927Z"
            stroke="#3D4630"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16.5706 14.2867C17.2018 14.2867 17.7134 13.775 17.7134 13.1438C17.7134 12.5127 17.2018 12.001 16.5706 12.001C15.9394 12.001 15.4277 12.5127 15.4277 13.1438C15.4277 13.775 15.9394 14.2867 16.5706 14.2867Z"
            fill="#3D4630"
          />
        </svg>
      </button>
    </div>
    {wallet && (
      <p className="mb-4 text-brand-olive-green font-bold">
        Balance: {balance ? `${balance.toFixed(4)} SOL` : `0 SOL`}
      </p>
    )}
    <div className="mb-4">
      <Input
        size="lg"
        variant="bordered"
        label="Donation Amount"
        radius="sm"
        className="mb-5"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        classNames={{
          inputWrapper:
            'border border-brand-dark hover:border-brand-dark data-[hover=true]:border-brand-dark',
          label: 'font-bold text-xl'
        }}
        endContent={<p className="text-brand-olive-green font-bold mb-1 text-2xl">SOL</p>}
      />
    </div>
    <ConsentCheckboxes />
    <button
      // type="submit"
      className="w-full py-3.5 mt-4 text-sm font-bold border border-olive-green rounded-full text-olive-green"
      // disabled={!wallet || !amount}
      onClick={onDonate}
    >
      Donate Now
    </button>
  </form>
);

// ... (ConsentCheckboxes component remains unchanged)

const CampaignImage = () => (
  <figure className="w-32 aspect-[1.182] relative">
    <img
      src="https://cdn.builder.io/api/v1/image/assets/TEMP/404118f2e1fc523f2713f14a85287a293ce21ffa4cfa985fc7d8ffb9ac4f0306"
      alt="Campaign"
      className="object-cover absolute inset-0 w-full h-full"
    />
  </figure>
);

const CampaignDetails = () => (
  <article className="flex-1">
    <h2 className="text-4xl font-bold tracking-wide uppercase text-brand-olive-green font-heading">
      Campaign for the Rare species of tigers
    </h2>
    <p className="mt-1.5 text-base font-bold tracking-wider text-brand-olive-green">
      Your donation will benefit Jenelle Marie
    </p>
  </article>
);

const ConsentCheckboxes = () => (
  <fieldset className="mb-4">
    <legend className="sr-only">Consent Options</legend>
    <div className="flex items-center mb-2">
      <Checkbox>Don&apos;t display my name publicly on the fundraiser.</Checkbox>
    </div>
    <div className="flex items-center">
      <Checkbox>
        Get occasional marketing updates from Raise. You may unsubscribe at any time.
      </Checkbox>
    </div>
  </fieldset>
);

export default DonateNowComp;
