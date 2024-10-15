import React from 'react';
import HeroSection from '@/app/(root)/hero';
import ValuesMissionAndVision from './valueMissionAndVision';
import WhyChooseUs from './whyChooseUs';
import PartnersComponent from './ourParthner';

const page = () => {
  return (
    <>
      <HeroSection
        imgUrl="https://images.unsplash.com/photo-1713865472031-ed36fd2b879a?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        title={
          <h1 className="text-5xl md:text-7xl xl:text-9xl text-brand-ivory main-heading">
            We’re Helping <br /> people to help Others
          </h1>
        }
        action={
          <svg
            width="173"
            height="173"
            viewBox="0 0 173 173"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21 90.1435H9.576V84.9915C9.576 82.1435 11.384 81.0395 13.24 81.0395C15.096 81.0395 16.904 82.1435 16.904 84.9915V87.6315H21V90.1435ZM11.528 87.6315H14.952V85.6795C14.952 84.5115 14.696 83.4715 13.24 83.4715C11.784 83.4715 11.528 84.5115 11.528 85.6795V87.6315Z"
              fill="#FDFDF0"
            />
            <path
              d="M23.6944 67.3827L12.9654 63.459L13.8209 61.0972L22.5664 64.2955L24.4628 59.0604L26.4464 59.7857L23.6944 67.3827Z"
              fill="#FDFDF0"
            />
            <path
              d="M32.6864 48.4651L26.7317 37.7733L28.3829 35.7961L39.8553 39.8808L38.1836 41.8826L35.6848 40.9059L32.9465 44.1849L34.3171 46.5124L32.6864 48.4651ZM29.6846 38.6305L31.9357 42.4747L33.8331 40.2028L29.7051 38.606L29.6846 38.6305Z"
              fill="#FDFDF0"
            />
            <path
              d="M52.8663 29.9302L50.6502 26.0735L43.5347 22.1365L45.9844 20.7154L50.5436 23.2868L50.5931 18.0419L53.015 16.637L52.8549 24.8686L55.0391 28.6697L52.8663 29.9302Z"
              fill="#FDFDF0"
            />
            <path
              d="M96.8803 21.4738L98.4898 12.3019L95.1183 11.7046L95.4834 9.62441L104.7 11.2573L104.335 13.3375L100.963 12.7402L99.3537 21.912L96.8803 21.4738Z"
              fill="#FDFDF0"
            />
            <path
              d="M114.962 27.0468L120.654 17.1416L122.827 18.4021L120.643 22.2033L124.642 24.5235L126.827 20.7223L128.999 21.9828L123.308 31.888L121.135 30.6275L123.59 26.3547L119.59 24.0345L117.135 28.3073L114.962 27.0468Z"
              fill="#FDFDF0"
            />
            <path
              d="M133.914 41.0408L142.648 33.6772L148.125 40.2351L146.51 41.5964L142.643 36.9666L140.772 38.5445L144.32 42.7936L142.828 44.0519L139.279 39.8027L137.139 41.6076L141.087 46.3356L139.473 47.697L133.914 41.0408Z"
              fill="#FDFDF0"
            />
            <path
              d="M155.592 82.0602V84.4922C154.072 84.4922 153.48 85.6762 153.48 87.0202C153.48 87.9002 153.736 89.2442 154.904 89.2442C156.136 89.2442 156.344 87.5322 156.792 85.8522C157.24 84.1562 157.896 82.4442 160.04 82.4442C162.376 82.4442 163.496 84.6522 163.496 86.7162C163.496 89.1002 162.456 91.2922 159.816 91.2922V88.8602C161.192 88.7802 161.544 87.8042 161.544 86.6042C161.544 85.8042 161.208 84.8762 160.248 84.8762C159.368 84.8762 159.256 85.4202 158.52 88.2842C158.312 89.1162 157.784 91.6762 155.192 91.6762C153.096 91.6762 151.528 90.0282 151.528 86.9242C151.528 84.3962 152.776 82.0282 155.592 82.0602Z"
              fill="#FDFDF0"
            />
            <path
              d="M149.511 104.383L160.24 108.307L159.384 110.668L155.267 109.163L153.692 113.51L157.809 115.016L156.954 117.378L146.225 113.454L147.08 111.092L151.709 112.785L153.283 108.437L148.655 106.745L149.511 104.383Z"
              fill="#FDFDF0"
            />
            <path
              d="M144.236 128.316C146.829 130.502 147.514 133.8 145.247 136.514C142.981 139.229 139.629 139.123 137.036 136.937C134.516 134.812 133.831 131.514 136.097 128.8C138.364 126.086 141.716 126.191 144.236 128.316ZM142.625 130.244C141.17 129.017 139.158 128.43 137.712 130.162C136.266 131.893 137.19 133.782 138.646 135.009C140.175 136.298 142.187 136.885 143.633 135.153C145.079 133.422 144.154 131.533 142.625 130.244Z"
              fill="#FDFDF0"
            />
            <path
              d="M118.037 157.26L115.002 145.813L117.161 144.561L122.71 150.331L122.738 150.315L120.511 142.618L122.711 141.341L131.019 149.729L128.846 150.989L123.408 145.154L123.38 145.17L125.538 152.908L123.503 154.088L117.893 148.242L117.865 148.259L120.168 156.023L118.037 157.26Z"
              fill="#FDFDF0"
            />
            <path
              d="M102.025 150.497L104 161.749L97.9343 162.824C95.9177 163.181 94.3954 162.004 94.0968 160.302C93.8645 158.979 94.2259 157.891 95.382 157.166L95.3765 157.135C94.108 157.034 93.554 155.914 93.2761 154.793C93.1044 154.092 92.8879 152.766 92.3361 152.213L94.8096 151.775C95.2334 152.431 95.3927 153.524 95.6764 154.4C96.0571 155.552 96.6052 155.991 97.8499 155.77L100.323 155.332L99.5517 150.935L102.025 150.497ZM101.189 160.265L100.633 157.097L97.9233 157.577C96.8205 157.772 96.3047 158.351 96.5039 159.486C96.6947 160.573 97.3763 160.94 98.4792 160.745L101.189 160.265Z"
              fill="#FDFDF0"
            />
            <path
              d="M79.0474 151.963L77.0727 163.215L68.6597 161.724L69.0248 159.644L74.9643 160.696L75.3874 158.285L69.9363 157.319L70.2737 155.397L75.7248 156.362L76.2088 153.604L70.1433 152.53L70.5083 150.45L79.0474 151.963Z"
              fill="#FDFDF0"
            />
            <path
              d="M57.1944 145.463L51.5027 155.368L44.1122 151.081L45.1644 149.25L50.3821 152.277L51.6017 150.154L46.8131 147.376L47.7856 145.684L52.5742 148.462L53.9693 146.034L48.6409 142.943L49.6931 141.112L57.1944 145.463Z"
              fill="#FDFDF0"
            />
            <path
              d="M38.6004 131.499L29.8664 138.863L28.2562 136.935L35.3756 130.932L31.8065 126.658L33.4212 125.297L38.6004 131.499Z"
              fill="#FDFDF0"
            />
            <rect
              x="37.9033"
              y="37.896"
              width="97"
              height="97"
              rx="48.5"
              stroke="#FDFDF0"
              strokeWidth="3"
            />
            <path
              d="M75.4498 72.2183L97.8007 84.963C98.0918 85.1267 98.2373 85.486 98.2373 86.0409C98.2373 86.5958 98.0918 86.937 97.8007 87.0643L75.4498 99.809C75.2315 99.9545 74.9586 100.005 74.6311 99.9591C74.3036 99.9136 74.0125 99.7544 73.7578 99.4815V72.6004C74.3218 71.9818 74.8858 71.8545 75.4498 72.2183Z"
              fill="#FDFDF0"
            />
          </svg>
        }
      />
      <ValuesMissionAndVision />
      <WhyChooseUs />
      <PartnersComponent />
    </>
  );
};

export default page;
