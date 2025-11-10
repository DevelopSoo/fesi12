// src/components/molecules/Footer.tsx

import Button from "../atoms/Button";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <Button>홈</Button>
      <Button>소개</Button>
      <Button>이용약관</Button>
      <Button>개인정보처리방침</Button>
    </footer>
  );
}
