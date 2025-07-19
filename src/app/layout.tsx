import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-noto-sans-kr",
});

export const metadata: Metadata = {
  title: "사상체질 자가진단 - Korean Type",
  description: "한의학의 사상체질론을 바탕으로 한 간단한 체질 진단 서비스",
  keywords: ["사상체질", "한의학", "체질진단", "태음인", "소양인", "소음인", "태양인"],
  authors: [{ name: "Korean Type" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={notoSansKR.variable}>
      <body className={`${notoSansKR.className} antialiased`}>{children}</body>
    </html>
  );
}
