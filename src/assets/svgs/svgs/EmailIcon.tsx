"use client";

interface EmailIconProps {
  stroke: string;
}

const EmailIcon: React.FC<EmailIconProps> = ({ stroke }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M18.3317 8.75033V12.917C18.3317 15.8337 16.665 17.0837 14.165 17.0837H5.83171C3.33171 17.0837 1.66504 15.8337 1.66504 12.917V7.08366C1.66504 4.16699 3.33171 2.91699 5.83171 2.91699H11.665"
      stroke={stroke}
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5.83496 7.5L8.4433 9.58333C9.30163 10.2667 10.71 10.2667 11.5683 9.58333L12.5516 8.8"
      stroke={stroke}
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16.2484 6.66667C17.399 6.66667 18.3317 5.73393 18.3317 4.58333C18.3317 3.43274 17.399 2.5 16.2484 2.5C15.0978 2.5 14.165 3.43274 14.165 4.58333C14.165 5.73393 15.0978 6.66667 16.2484 6.66667Z"
      stroke={stroke}
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default EmailIcon;
