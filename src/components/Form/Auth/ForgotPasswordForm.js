
import React from "react";
import * as Components from "../../../components/all";

const logo = "https://d10grw5om5v513.cloudfront.net/assets/images/logo1.png";

function ForgotPasswordForm() {
  const [email, setEmail] = React.useState("");
  const [secret, setSecret] = React.useState("");
  return (
    <div className="StudentScreen bg-[#FFF] flex flex-row h-screen">
      <div className="h-full w-[23%] bg-[#C33B4C] flex flex-col items-start py-10 px-16 text-left">
        <img
          src={logo}
          alt="logo_img"
          className="h-[50px] object-contain cursor-pointer md:z-50"
          onClick={() => {}}
        />

        <Components.BiggerParagraph className="text-left text-white font-bold font-[riffic] capitalize mb-3 mt-auto">
          Whatever your dream is, KidverCity is proud to offer a values-based
          educational
        </Components.BiggerParagraph>
        <p className="text-[13px] text-white mb-auto">
          Patton is at the frontier of academic and intellectual discovery.
          Those who venture here—to learn, research, teach, work, and grow—join
          nearly four centuries of students and scholars in the pursuit of
          truth, knowledge, and a better world..
        </p>
      </div>

      <div className="h-full w-[77%] relative flex flex-col items-center justify-center">
        <svg
          width="140"
          height="160"
          viewBox="0 0 158 180"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-0 right-0"
        >
          <ellipse
            cx="119.5"
            cy="63.5"
            rx="119.5"
            ry="116.5"
            fill="#F38315"
            fill-opacity="0.6"
          />
        </svg>
        <div
          style={{
            boxShadow: "0px 4px 68px rgba(0, 0, 0, 0.08)",
            borderRadius: 32,
          }}
          className="flex flex-col bg-[#FFF] min-h-[500px] w-[40%] p-8 justify-center"
        >
          <div className="rounded-full bg-[#FFDED1] flex items-center justify-center h-[60px] w-[60px] mx-auto">
            <svg
              width="35"
              height="35"
              viewBox="0 0 60 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.0209 20.2294C20.0209 19.305 20.7729 18.5529 21.6973 18.5529H24.2357V12.7864C24.2357 12.2879 24.2655 11.7963 24.3219 11.3126C24.0576 11.1941 23.7712 11.1328 23.4816 11.1327H5.58105C4.44035 11.1328 3.51562 12.0575 3.51562 13.1982V31.0986C3.51562 32.2393 4.44035 33.1641 5.58105 33.1641H20.0209V20.2294Z"
                fill="#F38315"
              />
              <path
                d="M9.02344 31.0986V13.1982C9.02344 12.0575 9.94816 11.1328 11.0889 11.1328H5.58105C4.44035 11.1328 3.51562 12.0575 3.51562 13.1982V31.0986C3.51562 32.2393 4.44035 33.1641 5.58105 33.1641H11.0889C9.94816 33.1641 9.02344 32.2393 9.02344 31.0986Z"
                fill="#F38315"
              />
              <path
                d="M13.0501 26.2987C12.8831 26.2114 12.7432 26.08 12.6456 25.9188C12.5479 25.7576 12.4963 25.5727 12.4963 25.3842V24.034C12.4963 22.9942 13.3423 22.1483 14.382 22.1483C15.9213 22.1483 17.1737 20.8959 17.1737 19.3566V19.283C17.1737 17.826 15.9884 16.6406 14.5313 16.6406C14.3677 16.6406 14.2078 16.6563 14.0523 16.6849C15.2815 16.911 16.2158 17.9896 16.2158 19.2831V19.3567C16.2158 20.8961 14.9636 22.1484 13.4241 22.1484C12.3844 22.1484 11.5384 22.9943 11.5384 24.0341V25.3843C11.5384 25.6582 11.6472 25.9209 11.8409 26.1145C12.0345 26.3082 12.2972 26.417 12.5711 26.417C12.738 26.4171 12.9024 26.3765 13.0501 26.2987ZM9.82337 19.5757V19.2832C9.82337 16.8489 11.6806 14.8403 14.0523 14.5995C13.8932 14.5833 13.7333 14.5752 13.5734 14.5752C10.9774 14.5752 8.86548 16.6871 8.86548 19.2831V19.5756C8.86548 19.7112 8.89219 19.8455 8.94409 19.9708C8.99598 20.0961 9.07205 20.2099 9.16794 20.3058C9.26383 20.4017 9.37767 20.4777 9.50295 20.5296C9.62824 20.5815 9.76252 20.6082 9.89813 20.6082C10.065 20.6083 10.2294 20.5678 10.3771 20.49C10.2101 20.4027 10.0702 20.2713 9.97257 20.1102C9.87496 19.949 9.82336 19.7641 9.82337 19.5757ZM12.4963 28.6889V28.5512C12.4963 28.3627 12.5479 28.1779 12.6456 28.0166C12.7432 27.8554 12.8831 27.724 13.0501 27.6367C12.9024 27.559 12.7381 27.5184 12.5712 27.5184C12.2973 27.5184 12.0346 27.6272 11.841 27.8209C11.6473 28.0146 11.5385 28.2772 11.5385 28.5511V28.6888C11.5385 28.9627 11.6473 29.2253 11.841 29.419C12.0346 29.6126 12.2973 29.7214 12.5712 29.7214C12.7381 29.7215 12.9025 29.681 13.0501 29.6032C12.8831 29.5159 12.7432 29.3846 12.6455 29.2234C12.5479 29.0622 12.4963 28.8774 12.4963 28.6889Z"
                fill="#814AA0"
              />
              <path
                d="M13.5291 26.417C13.2552 26.417 12.9925 26.3082 12.7989 26.1145C12.6052 25.9209 12.4964 25.6582 12.4964 25.3843V24.0341C12.4964 22.9943 13.3424 22.1484 14.3821 22.1484C15.9215 22.1484 17.1737 20.8961 17.1737 19.3567V19.2831C17.1737 17.826 15.9884 16.6406 14.5313 16.6406C13.0742 16.6406 11.8888 17.826 11.8888 19.2831V19.5756C11.8888 19.8495 11.78 20.1121 11.5863 20.3058C11.3927 20.4994 11.13 20.6082 10.8561 20.6082C10.5823 20.6082 10.3196 20.4994 10.1259 20.3058C9.93228 20.1121 9.82349 19.8495 9.82349 19.5756V19.2831C9.82349 16.6871 11.9354 14.5752 14.5314 14.5752C17.1273 14.5752 19.2393 16.6871 19.2393 19.2831V19.3567C19.2393 21.9748 17.1573 24.1157 14.562 24.2106V25.3843C14.5619 25.6582 14.453 25.9209 14.2593 26.1145C14.0656 26.3082 13.803 26.417 13.5291 26.417ZM13.5291 29.7217C13.3935 29.7217 13.2592 29.695 13.1339 29.6431C13.0086 29.5912 12.8948 29.5151 12.7989 29.4192C12.703 29.3233 12.6269 29.2095 12.575 29.0842C12.5231 28.9589 12.4964 28.8246 12.4964 28.689V28.5513C12.4964 28.2775 12.6052 28.0148 12.7989 27.8211C12.9925 27.6275 13.2552 27.5187 13.5291 27.5187C13.8029 27.5187 14.0656 27.6275 14.2593 27.8211C14.4529 28.0148 14.5617 28.2775 14.5617 28.5513V28.689C14.5617 28.8246 14.535 28.9589 14.4831 29.0842C14.4312 29.2095 14.3552 29.3233 14.2593 29.4192C14.1634 29.5151 14.0495 29.5912 13.9243 29.6431C13.799 29.695 13.6647 29.7217 13.5291 29.7217Z"
                fill="white"
              />
              <path
                d="M43.9243 40.3761C44.6117 40.5717 45.1172 41.2038 45.1172 41.9531V46.9922H52.1127C53.1033 46.9922 53.9062 46.1892 53.9062 45.1986V40.3762H43.9243V40.3761Z"
                fill="#F38315"
              />
              <path
                d="M29.3024 18.5529V12.7864C29.3024 8.59441 32.7129 5.18391 36.905 5.18391C41.097 5.18391 44.5075 8.59441 44.5075 12.7864V18.5529H49.6915V12.7864C49.6915 5.73598 43.9554 0 36.905 0C29.8545 0 24.1184 5.73598 24.1184 12.7864V18.5529H29.3024Z"
                fill="#F38315"
              />
              <path
                d="M44.5075 12.7864V18.5529H47.511V12.7864C47.511 8.59441 44.1005 5.18391 39.9085 5.18391C39.3945 5.18391 38.8925 5.23582 38.4067 5.33356C41.8819 6.0327 44.5075 9.1084 44.5075 12.7864ZM27.1219 18.5529V12.7864C27.1219 6.24399 32.0614 0.834375 38.4067 0.0885938C37.9083 0.0297906 37.4069 0.000208799 36.905 0C29.8545 0 24.1184 5.73598 24.1184 12.7864V18.5529H27.1219Z"
                fill="#F38315"
              />
              <path
                d="M52.1128 18.4357H21.6974C20.7068 18.4357 19.9038 19.2388 19.9038 20.2293V40.3125H43.4767C43.7451 40.3125 43.998 40.3786 44.222 40.4934H53.9063V20.2294C53.9063 19.2388 53.1033 18.4357 52.1128 18.4357Z"
                fill="#F38315"
              />
              <path
                d="M26.5241 40.3125V20.2294C26.5241 19.2388 27.3272 18.4358 28.3176 18.4358H21.6974C20.7068 18.4358 19.9038 19.2388 19.9038 20.2294V40.3125H26.5241Z"
                fill="#F38315"
              />
              <path
                d="M36.3705 39.0627C34.7221 39.0627 33.3812 37.7217 33.3812 36.0734V32.2147C31.9283 31.0417 31.1526 29.2249 31.3315 27.3265C31.5853 24.6354 33.8119 22.4655 36.511 22.2792C36.6421 22.2702 36.7734 22.2657 36.9047 22.2656C39.9919 22.2656 42.5034 24.7771 42.5034 27.8643C42.5034 29.5751 41.7385 31.1576 40.4283 32.2148V36.0734C40.4283 37.7217 39.0874 39.0627 37.439 39.0627H36.3705Z"
                fill="white"
              />
              <path
                d="M40.7099 27.8643C40.7099 25.6734 38.8583 23.915 36.6346 24.0685C34.7957 24.1956 33.2903 25.6596 33.1173 27.4949C32.9748 29.0061 33.7175 30.3561 34.8865 31.0891C35.0629 31.1998 35.1748 31.3888 35.1748 31.597V36.0734C35.1748 36.7337 35.7101 37.2691 36.3705 37.2691H37.4393C38.0996 37.2691 38.6351 36.7338 38.6351 36.0734V31.6003C38.6351 31.3904 38.7475 31.1996 38.9252 31.088C39.9969 30.415 40.7099 29.2233 40.7099 27.8643Z"
                fill="white"
              />
              <path
                d="M37.1312 36.0734V31.597C37.1312 31.3888 37.0194 31.1998 36.8429 31.0891C35.6739 30.3561 34.9311 29.0061 35.0738 27.4949C35.224 25.9019 36.3783 24.5891 37.883 24.1871C37.4762 24.0793 37.0544 24.0392 36.6346 24.0685C34.7957 24.1956 33.2903 25.6597 33.1173 27.4949C32.9748 29.0061 33.7174 30.3561 34.8865 31.0891C35.0629 31.1998 35.1748 31.3888 35.1748 31.597V36.0734C35.1748 36.7337 35.7101 37.2691 36.3706 37.2691H37.4393C37.5963 37.2691 37.7457 37.2381 37.8831 37.1831C37.4427 37.0066 37.1312 36.5767 37.1312 36.0734Z"
                fill="#F38315"
              />
              <path
                d="M43.4766 40.1953H7.85156C6.88078 40.1953 6.09375 40.9823 6.09375 41.9531V47.1916C7.8715 49.8578 10.0808 52.2093 12.6309 54.1498H43.4766C44.4473 54.1498 45.2344 53.3627 45.2344 52.392V41.9531C45.2344 40.9823 44.4473 40.1953 43.4766 40.1953Z"
                fill="#F38315"
              />
              <path
                d="M13.4766 40.1953H7.85156C6.88078 40.1953 6.09375 40.9823 6.09375 41.9531V47.1916C7.8715 49.8578 10.0808 52.2093 12.6309 54.1498H13.4766C12.5058 54.1498 11.7188 53.3627 11.7188 52.392V41.9531C11.7188 40.9823 12.5058 40.1953 13.4766 40.1953Z"
                fill="#F38315"
              />
              <path
                d="M12.8602 45.9547V44.3341C12.8602 44.1329 12.9451 43.952 13.0806 43.8238C12.9504 43.7 12.7776 43.6309 12.5979 43.631C12.4114 43.631 12.2326 43.7051 12.1007 43.837C11.9689 43.9688 11.8948 44.1477 11.8948 44.3341V45.3974L12.8602 45.9547ZM14.2664 45.9547L15.5238 45.2287C15.4135 45.1303 15.2749 45.0692 15.1279 45.0541C14.9808 45.0389 14.8327 45.0705 14.7046 45.1444L14.2664 45.3974V45.9547ZM14.2664 48.3905V48.9478L14.7046 49.2008C14.8112 49.2626 14.9322 49.2951 15.0554 49.2952C15.228 49.2947 15.3943 49.231 15.523 49.1161L14.2664 48.3905ZM10.4961 48.9434C10.4029 48.7819 10.3776 48.5899 10.4259 48.4098C10.4742 48.2297 10.592 48.0761 10.7535 47.9829L12.1569 47.1725L10.7535 46.3622C10.6572 46.3065 10.5755 46.2288 10.515 46.1355C10.4546 46.0421 10.4172 45.9357 10.4059 45.8251C10.3945 45.7144 10.4096 45.6027 10.4498 45.499C10.4901 45.3953 10.5543 45.3027 10.6374 45.2286L10.4913 45.1444C10.4113 45.0975 10.3229 45.0669 10.231 45.0543C10.1391 45.0417 10.0457 45.0475 9.95602 45.0712C9.86637 45.0949 9.7823 45.1361 9.70864 45.1924C9.63498 45.2487 9.57319 45.3191 9.52682 45.3994C9.48046 45.4797 9.45043 45.5684 9.43848 45.6603C9.42653 45.7523 9.43289 45.8457 9.45718 45.9352C9.48148 46.0247 9.52323 46.1085 9.58005 46.1817C9.63686 46.255 9.70761 46.3164 9.78822 46.3622L11.1917 47.1725L9.78822 47.9829C9.70761 48.0287 9.63686 48.09 9.58005 48.1633C9.52323 48.2366 9.48148 48.3204 9.45718 48.4099C9.43289 48.4994 9.42653 48.5928 9.43848 48.6848C9.45043 48.7767 9.48046 48.8654 9.52682 48.9457C9.57319 49.026 9.63498 49.0963 9.70864 49.1527C9.7823 49.209 9.86637 49.2502 9.95602 49.2739C10.0457 49.2976 10.1391 49.3033 10.231 49.2908C10.3229 49.2782 10.4113 49.2476 10.4913 49.2007L10.6383 49.1159C10.582 49.0664 10.534 49.0081 10.4961 48.9434ZM12.8602 50.0109V48.3903L11.8949 48.9477V50.0109C11.8949 50.1974 11.969 50.3763 12.1008 50.5081C12.2327 50.64 12.4115 50.7141 12.598 50.7141C12.7777 50.7141 12.9505 50.6451 13.0807 50.5213C13.0111 50.4558 12.9556 50.3767 12.9176 50.2889C12.8797 50.2012 12.8602 50.1066 12.8602 50.0109ZM18.5633 48.9434C18.4701 48.7819 18.4448 48.5899 18.4931 48.4098C18.5414 48.2297 18.6592 48.0761 18.8207 47.9829L20.2241 47.1725L18.8207 46.3622C18.7244 46.3065 18.6427 46.2288 18.5822 46.1355C18.5218 46.0421 18.4844 45.9357 18.473 45.8251C18.4617 45.7144 18.4768 45.6027 18.517 45.499C18.5573 45.3953 18.6215 45.3027 18.7045 45.2286L18.5585 45.1443C18.4785 45.0974 18.3901 45.0667 18.2982 45.0542C18.2063 45.0416 18.1129 45.0474 18.0232 45.0711C17.9336 45.0948 17.8495 45.136 17.7758 45.1923C17.7022 45.2486 17.6404 45.319 17.594 45.3993C17.5476 45.4796 17.5176 45.5682 17.5057 45.6602C17.4937 45.7522 17.5001 45.8456 17.5244 45.9351C17.5487 46.0245 17.5904 46.1083 17.6472 46.1816C17.704 46.2549 17.7748 46.3162 17.8554 46.3621L19.2588 47.1724L17.8554 47.9828C17.7748 48.0286 17.704 48.0899 17.6472 48.1632C17.5904 48.2365 17.5487 48.3203 17.5244 48.4098C17.5001 48.4993 17.4937 48.5927 17.5057 48.6846C17.5176 48.7766 17.5476 48.8653 17.594 48.9456C17.6404 49.0259 17.7022 49.0962 17.7758 49.1526C17.8495 49.2089 17.9336 49.2501 18.0232 49.2738C18.1129 49.2975 18.2063 49.3032 18.2982 49.2907C18.3901 49.2781 18.4785 49.2475 18.5585 49.2006L18.7055 49.1157C18.6491 49.0663 18.6011 49.0081 18.5633 48.9434ZM22.3336 45.9547L23.591 45.2287C23.4807 45.1303 23.3421 45.0692 23.195 45.0541C23.048 45.0389 22.8999 45.0705 22.7718 45.1444L22.3336 45.3974V45.9547ZM20.9274 45.9547V44.3341C20.9274 44.1329 21.0123 43.952 21.1478 43.8238C21.0176 43.7 20.8448 43.6309 20.6651 43.631C20.4786 43.631 20.2998 43.7051 20.1679 43.837C20.036 43.9688 19.962 44.1477 19.962 44.3341V45.3974L20.9274 45.9547ZM20.9274 50.0109V48.3903L19.9621 48.9477V50.0109C19.9621 50.1974 20.0362 50.3763 20.168 50.5081C20.2999 50.64 20.4787 50.7141 20.6652 50.7141C20.8449 50.7141 21.0177 50.6451 21.1479 50.5213C21.0782 50.4558 21.0227 50.3767 20.9848 50.2889C20.9469 50.2012 20.9273 50.1066 20.9274 50.0109ZM22.3336 48.3905V48.9478L22.7718 49.2008C22.8784 49.2626 22.9994 49.2951 23.1226 49.2952C23.2952 49.2947 23.4615 49.231 23.5902 49.1161L22.3336 48.3905ZM30.4008 45.9547L31.6582 45.2287C31.5479 45.1303 31.4093 45.0692 31.2622 45.0541C31.1151 45.0389 30.967 45.0706 30.839 45.1445L30.4008 45.3975V45.9547ZM28.9945 45.9547V44.3341C28.9945 44.1329 29.0795 43.952 29.215 43.8238C29.0848 43.7 28.912 43.6309 28.7323 43.631C28.5458 43.631 28.367 43.7051 28.2351 43.837C28.1032 43.9688 28.0292 44.1477 28.0292 44.3341V45.3974L28.9945 45.9547ZM26.6305 48.9434C26.5373 48.7819 26.512 48.5899 26.5603 48.4098C26.6085 48.2297 26.7264 48.0761 26.8879 47.9829L28.2913 47.1725L26.8879 46.3622C26.7916 46.3065 26.7099 46.2288 26.6494 46.1355C26.589 46.0421 26.5516 45.9357 26.5402 45.8251C26.5289 45.7144 26.544 45.6027 26.5842 45.499C26.6245 45.3953 26.6887 45.3027 26.7717 45.2286L26.6257 45.1443C26.5457 45.0974 26.4572 45.0667 26.3654 45.0542C26.2735 45.0416 26.18 45.0474 26.0904 45.0711C26.0007 45.0948 25.9167 45.136 25.843 45.1923C25.7694 45.2486 25.7076 45.319 25.6612 45.3993C25.6148 45.4796 25.5848 45.5682 25.5729 45.6602C25.5609 45.7522 25.5673 45.8456 25.5916 45.9351C25.6159 46.0245 25.6576 46.1083 25.7144 46.1816C25.7712 46.2549 25.842 46.3162 25.9226 46.3621L27.326 47.1724L25.9226 47.9828C25.842 48.0286 25.7712 48.0899 25.7144 48.1632C25.6576 48.2365 25.6159 48.3203 25.5916 48.4098C25.5673 48.4993 25.5609 48.5927 25.5729 48.6846C25.5848 48.7766 25.6148 48.8653 25.6612 48.9456C25.7076 49.0259 25.7694 49.0962 25.843 49.1526C25.9167 49.2089 26.0007 49.2501 26.0904 49.2738C26.18 49.2975 26.2735 49.3032 26.3654 49.2907C26.4572 49.2781 26.5457 49.2475 26.6257 49.2006L26.7727 49.1157C26.7163 49.0663 26.6683 49.0081 26.6305 48.9434ZM30.4008 48.3905V48.9478L30.839 49.2008C30.9456 49.2626 31.0666 49.2951 31.1898 49.2952C31.3623 49.2947 31.5287 49.231 31.6574 49.1161L30.4008 48.3905ZM28.9945 50.0109V48.3903L28.0293 48.9477V50.0109C28.0293 50.1974 28.1034 50.3763 28.2352 50.5081C28.3671 50.64 28.5459 50.7141 28.7324 50.7141C28.9121 50.7141 29.0849 50.6451 29.2151 50.5213C29.1454 50.4558 29.0899 50.3767 29.052 50.2889C29.014 50.2012 28.9945 50.1066 28.9945 50.0109ZM38.468 45.9547L39.7254 45.2287C39.6151 45.1303 39.4765 45.0692 39.3294 45.0541C39.1823 45.0389 39.0342 45.0706 38.9061 45.1445L38.468 45.3975V45.9547ZM37.0617 45.9547V44.3341C37.0617 44.1329 37.1467 43.952 37.2822 43.8238C37.152 43.7 36.9791 43.6309 36.7995 43.631C36.613 43.631 36.4341 43.7051 36.3023 43.837C36.1704 43.9688 36.0963 44.1477 36.0963 44.3341V45.3974L37.0617 45.9547ZM38.468 48.3905V48.9478L38.9061 49.2008C39.0128 49.2626 39.1338 49.2951 39.257 49.2952C39.4295 49.2947 39.5959 49.231 39.7246 49.1161L38.468 48.3905ZM37.0617 50.0109V48.3903L36.0965 48.9477V50.0109C36.0965 50.1974 36.1705 50.3763 36.3024 50.5081C36.4343 50.64 36.6131 50.7141 36.7996 50.7141C36.9793 50.7141 37.1521 50.6451 37.2823 50.5213C37.2126 50.4558 37.1571 50.3767 37.1192 50.2889C37.0812 50.2012 37.0617 50.1066 37.0617 50.0109ZM34.6977 48.9434C34.6045 48.7819 34.5792 48.5899 34.6275 48.4098C34.6757 48.2297 34.7936 48.0761 34.9551 47.9829L36.3585 47.1725L34.9551 46.3622C34.8588 46.3065 34.777 46.2288 34.7166 46.1355C34.6562 46.0421 34.6188 45.9357 34.6074 45.8251C34.5961 45.7144 34.6112 45.6027 34.6514 45.499C34.6916 45.3953 34.7559 45.3027 34.8389 45.2286L34.6929 45.1443C34.6129 45.0974 34.5244 45.0667 34.4326 45.0542C34.3407 45.0416 34.2472 45.0474 34.1576 45.0711C34.0679 45.0948 33.9839 45.136 33.9102 45.1923C33.8365 45.2486 33.7748 45.319 33.7284 45.3993C33.682 45.4796 33.652 45.5682 33.64 45.6602C33.6281 45.7522 33.6344 45.8456 33.6587 45.9351C33.683 46.0245 33.7248 46.1083 33.7816 46.1816C33.8384 46.2549 33.9092 46.3162 33.9898 46.3621L35.3932 47.1724L33.9898 47.9828C33.9092 48.0286 33.8384 48.0899 33.7816 48.1632C33.7248 48.2365 33.683 48.3203 33.6587 48.4098C33.6344 48.4993 33.6281 48.5927 33.64 48.6846C33.652 48.7766 33.682 48.8653 33.7284 48.9456C33.7748 49.0259 33.8365 49.0962 33.9102 49.1526C33.9839 49.2089 34.0679 49.2501 34.1576 49.2738C34.2472 49.2975 34.3407 49.3032 34.4326 49.2907C34.5244 49.2781 34.6129 49.2475 34.6929 49.2006L34.8397 49.1157C34.7834 49.0663 34.7355 49.0081 34.6977 48.9434Z"
                fill="#D73D24"
              />
              <path
                d="M16.6305 45.4017C16.5373 45.2402 16.3837 45.1224 16.2036 45.0741C16.0234 45.0259 15.8315 45.0511 15.67 45.1444L14.2665 45.9547V44.3341C14.2665 44.1477 14.1924 43.9688 14.0605 43.837C13.9287 43.7051 13.7498 43.631 13.5634 43.631C13.3769 43.631 13.198 43.7051 13.0662 43.837C12.9343 43.9688 12.8602 44.1477 12.8602 44.3341V45.9547L11.4567 45.1444C11.3767 45.0975 11.2882 45.0669 11.1963 45.0543C11.1045 45.0417 11.011 45.0475 10.9214 45.0712C10.8317 45.0949 10.7476 45.1361 10.674 45.1924C10.6003 45.2487 10.5385 45.3191 10.4922 45.3994C10.4458 45.4797 10.4158 45.5684 10.4038 45.6603C10.3919 45.7523 10.3982 45.8457 10.4225 45.9352C10.4468 46.0247 10.4886 46.1085 10.5454 46.1817C10.6022 46.255 10.6729 46.3164 10.7536 46.3622L12.157 47.1725L10.7536 47.9829C10.6729 48.0287 10.6022 48.09 10.5454 48.1633C10.4886 48.2366 10.4468 48.3204 10.4225 48.4099C10.3982 48.4994 10.3919 48.5928 10.4038 48.6848C10.4158 48.7767 10.4458 48.8654 10.4922 48.9457C10.5385 49.026 10.6003 49.0963 10.674 49.1527C10.7476 49.209 10.8317 49.2502 10.9214 49.2739C11.011 49.2976 11.1045 49.3033 11.1963 49.2908C11.2882 49.2782 11.3767 49.2476 11.4567 49.2007L12.8602 48.3903V50.0109C12.8602 50.1974 12.9343 50.3763 13.0662 50.5081C13.198 50.64 13.3769 50.7141 13.5634 50.7141C13.7498 50.7141 13.9287 50.64 14.0605 50.5081C14.1924 50.3763 14.2665 50.1974 14.2665 50.0109V48.3903L15.67 49.2007C15.75 49.2469 15.8383 49.2769 15.9298 49.289C16.0214 49.3011 16.1144 49.295 16.2036 49.2711C16.2928 49.2472 16.3764 49.2059 16.4497 49.1497C16.5229 49.0935 16.5844 49.0234 16.6305 48.9434C16.7237 48.7819 16.749 48.5899 16.7007 48.4098C16.6525 48.2297 16.5346 48.0761 16.3732 47.9829L14.9697 47.1725L16.3732 46.3622C16.5346 46.2689 16.6525 46.1154 16.7007 45.9352C16.749 45.7551 16.7237 45.5632 16.6305 45.4017ZM24.6977 45.4017C24.6044 45.2402 24.4509 45.1224 24.2708 45.0741C24.0906 45.0259 23.8987 45.0511 23.7372 45.1444L22.3337 45.9547V44.3341C22.3337 44.1477 22.2596 43.9688 22.1277 43.837C21.9959 43.7051 21.817 43.631 21.6305 43.631C21.4441 43.631 21.2652 43.7051 21.1334 43.837C21.0015 43.9688 20.9274 44.1477 20.9274 44.3341V45.9547L19.5239 45.1444C19.4439 45.0975 19.3554 45.0669 19.2635 45.0543C19.1716 45.0417 19.0782 45.0475 18.9885 45.0712C18.8989 45.0949 18.8148 45.1361 18.7412 45.1924C18.6675 45.2487 18.6057 45.3191 18.5593 45.3994C18.513 45.4797 18.483 45.5684 18.471 45.6603C18.459 45.7523 18.4654 45.8457 18.4897 45.9352C18.514 46.0247 18.5558 46.1085 18.6126 46.1817C18.6694 46.255 18.7401 46.3164 18.8207 46.3622L20.2242 47.1725L18.8207 47.9829C18.7401 48.0287 18.6694 48.09 18.6126 48.1633C18.5558 48.2366 18.514 48.3204 18.4897 48.4099C18.4654 48.4994 18.459 48.5928 18.471 48.6848C18.483 48.7767 18.513 48.8654 18.5593 48.9457C18.6057 49.026 18.6675 49.0963 18.7412 49.1527C18.8148 49.209 18.8989 49.2502 18.9885 49.2739C19.0782 49.2976 19.1716 49.3033 19.2635 49.2908C19.3554 49.2782 19.4439 49.2476 19.5239 49.2007L20.9274 48.3903V50.0109C20.9274 50.1974 21.0015 50.3763 21.1334 50.5081C21.2652 50.64 21.4441 50.7141 21.6305 50.7141C21.817 50.7141 21.9959 50.64 22.1277 50.5081C22.2596 50.3763 22.3337 50.1974 22.3337 50.0109V48.3903L23.7372 49.2007C23.8172 49.2469 23.9054 49.2769 23.997 49.289C24.0886 49.3011 24.1816 49.295 24.2708 49.2711C24.36 49.2472 24.4436 49.2059 24.5169 49.1497C24.5901 49.0935 24.6516 49.0234 24.6977 48.9434C24.7909 48.7819 24.8162 48.5899 24.7679 48.4098C24.7197 48.2297 24.6018 48.0761 24.4403 47.9829L23.0369 47.1725L24.4403 46.3622C24.6018 46.2689 24.7197 46.1154 24.7679 45.9352C24.8162 45.7551 24.7909 45.5632 24.6977 45.4017ZM32.7649 45.4017C32.6716 45.2402 32.5181 45.1224 32.3379 45.0741C32.1578 45.0259 31.9659 45.0511 31.8044 45.1444L30.4009 45.9547V44.3341C30.4009 44.1477 30.3268 43.9688 30.1949 43.837C30.0631 43.7051 29.8842 43.631 29.6977 43.631C29.5112 43.631 29.3324 43.7051 29.2005 43.837C29.0687 43.9688 28.9946 44.1477 28.9946 44.3341V45.9547L27.5911 45.1444C27.5111 45.0975 27.4226 45.0669 27.3307 45.0543C27.2388 45.0417 27.1454 45.0475 27.0557 45.0712C26.9661 45.0949 26.882 45.1361 26.8083 45.1924C26.7347 45.2487 26.6729 45.3191 26.6265 45.3994C26.5802 45.4797 26.5501 45.5684 26.5382 45.6603C26.5262 45.7523 26.5326 45.8457 26.5569 45.9352C26.5812 46.0247 26.6229 46.1085 26.6798 46.1817C26.7366 46.255 26.8073 46.3164 26.8879 46.3622L28.2914 47.1725L26.8879 47.9829C26.8073 48.0287 26.7366 48.09 26.6798 48.1633C26.6229 48.2366 26.5812 48.3204 26.5569 48.4099C26.5326 48.4994 26.5262 48.5928 26.5382 48.6848C26.5501 48.7767 26.5802 48.8654 26.6265 48.9457C26.6729 49.026 26.7347 49.0963 26.8083 49.1527C26.882 49.209 26.9661 49.2502 27.0557 49.2739C27.1454 49.2976 27.2388 49.3033 27.3307 49.2908C27.4226 49.2782 27.5111 49.2476 27.5911 49.2007L28.9946 48.3903V50.0109C28.9946 50.1974 29.0687 50.3763 29.2005 50.5081C29.3324 50.64 29.5112 50.7141 29.6977 50.7141C29.8842 50.7141 30.0631 50.64 30.1949 50.5081C30.3268 50.3763 30.4009 50.1974 30.4009 50.0109V48.3903L31.8044 49.2007C31.8844 49.2469 31.9726 49.2769 32.0642 49.289C32.1557 49.3011 32.2488 49.295 32.338 49.2711C32.4272 49.2472 32.5108 49.2059 32.584 49.1497C32.6573 49.0935 32.7187 49.0234 32.7649 48.9434C32.8581 48.7819 32.8834 48.5899 32.8351 48.4098C32.7869 48.2297 32.669 48.0761 32.5075 47.9829L31.1041 47.1725L32.5075 46.3622C32.669 46.2689 32.7869 46.1154 32.8351 45.9352C32.8834 45.7551 32.8581 45.5632 32.7649 45.4017ZM40.5746 47.9829L39.1712 47.1725L40.5746 46.3622C40.6552 46.3164 40.726 46.255 40.7828 46.1817C40.8396 46.1085 40.8813 46.0247 40.9056 45.9352C40.9299 45.8457 40.9363 45.7523 40.9243 45.6603C40.9124 45.5684 40.8824 45.4797 40.836 45.3994C40.7896 45.3191 40.7278 45.2487 40.6542 45.1924C40.5805 45.1361 40.4965 45.0949 40.4068 45.0712C40.3172 45.0475 40.2237 45.0417 40.1318 45.0543C40.04 45.0669 39.9515 45.0975 39.8715 45.1444L38.4679 45.9547V44.3341C38.4679 44.1477 38.3938 43.9688 38.262 43.837C38.1301 43.7051 37.9513 43.631 37.7648 43.631C37.5783 43.631 37.3995 43.7051 37.2676 43.837C37.1358 43.9688 37.0617 44.1477 37.0617 44.3341V45.9547L35.6581 45.1444C35.5781 45.0975 35.4896 45.0669 35.3978 45.0543C35.3059 45.0417 35.2124 45.0475 35.1228 45.0712C35.0332 45.0949 34.9491 45.1361 34.8754 45.1924C34.8018 45.2487 34.74 45.3191 34.6936 45.3994C34.6472 45.4797 34.6172 45.5684 34.6053 45.6603C34.5933 45.7523 34.5997 45.8457 34.624 45.9352C34.6483 46.0247 34.69 46.1085 34.7468 46.1817C34.8036 46.255 34.8744 46.3164 34.955 46.3622L36.3584 47.1725L34.955 47.9829C34.8744 48.0287 34.8036 48.09 34.7468 48.1633C34.69 48.2366 34.6483 48.3204 34.624 48.4099C34.5997 48.4994 34.5933 48.5928 34.6053 48.6848C34.6172 48.7767 34.6472 48.8654 34.6936 48.9457C34.74 49.026 34.8018 49.0963 34.8754 49.1527C34.9491 49.209 35.0332 49.2502 35.1228 49.2739C35.2124 49.2976 35.3059 49.3033 35.3978 49.2908C35.4896 49.2782 35.5781 49.2476 35.6581 49.2007L37.0617 48.3903V50.0109C37.0617 50.1974 37.1358 50.3763 37.2676 50.5081C37.3995 50.64 37.5783 50.7141 37.7648 50.7141C37.9513 50.7141 38.1301 50.64 38.262 50.5081C38.3938 50.3763 38.4679 50.1974 38.4679 50.0109V48.3903L39.8715 49.2007C39.9514 49.2469 40.0397 49.2769 40.1313 49.289C40.2228 49.3011 40.3159 49.295 40.4051 49.2711C40.4943 49.2472 40.5779 49.2059 40.6511 49.1497C40.7244 49.0935 40.7858 49.0234 40.832 48.9434C40.9252 48.7819 40.9505 48.5899 40.9022 48.4098C40.8539 48.2297 40.7361 48.0761 40.5746 47.9829Z"
                fill="white"
              />
            </svg>
          </div>

          <Components.SubHeading className="!text-2xl mt-5">
            Forgot Password?{" "}
          </Components.SubHeading>

          <Components.Paragraph className="!text-sm mt-1 mx-6">
            Enter the email with your account and sent an email with reset your
            password
          </Components.Paragraph>
          <div className="w-[80%] mx-auto mt-7 flex flex-col">
            <div className="text-[12px] ml-2 mr-auto">Email</div>
            <div className="flex items-center px-2 p-1 border border-[#CDD2E1] rounded-full mx-2">
              <input
                type="text"
                className="flex-1 px-4 focus:outline-none"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <svg
                width="17"
                height="15"
                viewBox="0 0 21 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.95 19.9524L9.7 15.2976L11.1 13.7643L13.95 16.8857L19.6 10.6976L21 12.2309L13.95 19.9524ZM10 7.90476L18 2.42857H2L10 7.90476ZM0 17.7619V0.238091H20V7.19285L18 9.38333V4.61904L10 10.0952L2 4.61904V15.5714H7.15L9.15 17.7619H0Z"
                  fill="#A7AFB2"
                />
              </svg>
            </div>

            <div className="text-[12px] mt-3 ml-2  mr-auto">
              Secret <span className="text-[#EB2F2F]">*</span>
            </div>
            <div className="flex items-center px-2 p-1 border border-[#CDD2E1] rounded-full mx-2">
              <input
                type="text"
                className="flex-1 px-4 focus:outline-none"
                value={secret}
                onChange={(e) => setSecret(e.target.value)}
                placeholder="Secret"
              />
              <svg
                width="17"
                height="15"
                viewBox="0 0 19 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 12C15.34 12 15.67 12.04 16 12.09V9C16 8.46957 15.7893 7.96086 15.4142 7.58579C15.0391 7.21071 14.5304 7 14 7H13V5C13 2.24 10.76 0 8 0C5.24 0 3 2.24 3 5V7H2C1.46957 7 0.960859 7.21071 0.585786 7.58579C0.210714 7.96086 0 8.46957 0 9V19C0 20.11 0.89 21 2 21H9.81C9.3 20.12 9 19.1 9 18C9 14.69 11.69 12 15 12ZM5 5C5 3.34 6.34 2 8 2C9.66 2 11 3.34 11 5V7H5V5ZM8 16C7.60444 16 7.21776 15.8827 6.88886 15.6629C6.55996 15.4432 6.30362 15.1308 6.15224 14.7654C6.00087 14.3999 5.96126 13.9978 6.03843 13.6098C6.1156 13.2219 6.30608 12.8655 6.58579 12.5858C6.86549 12.3061 7.22186 12.1156 7.60982 12.0384C7.99778 11.9613 8.39991 12.0009 8.76537 12.1522C9.13082 12.3036 9.44318 12.56 9.66294 12.8889C9.8827 13.2178 10 13.6044 10 14C10 15.11 9.11 16 8 16ZM18.5 16.25L13.75 21L11 18L12.16 16.84L13.75 18.43L17.34 14.84L18.5 16.25Z"
                  fill="#A7AFB2"
                />
              </svg>
            </div>

            {secret === process.env.REACT_APP_AUTH_SECRET ? (
              <div className="w-full text-center p-1 bg-[#F38315] text-white rounded-lg text-sm mt-5">
                Reset Password
              </div>
            ) : (
              <div className="pt-4">Secret Required To Request Password</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordForm;
