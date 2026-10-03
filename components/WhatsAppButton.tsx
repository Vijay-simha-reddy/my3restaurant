import Image from "next/image";

const PHONE = "919010001484";
const MESSAGE = "Hi, I'd like to order from MY3";
const WA_LINK = `https://wa.me/${PHONE}?text=${encodeURIComponent(MESSAGE)}`;

export default function WhatsAppButton() {
  return (
    <a
      className="whatsapp-fab"
      href={WA_LINK}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with MY3 on WhatsApp"
    >
      <Image src="/images/whatsapp_image.png" alt="" width={52} height={52} />
    </a>
  );
}
