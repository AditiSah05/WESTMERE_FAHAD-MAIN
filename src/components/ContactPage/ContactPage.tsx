import ContactCard from './ContactCard'
import ContactHeader from './ContactHeader'

export default function ContactPage() {
  return (
    <div data-page="contact" className="overflow-hidden bg-paper pt-[130px] font-sans min-[769px]:pt-[178px]">
      <div className="mx-auto w-full max-w-[1040px] px-5">
        <ContactHeader />
        <ContactCard />
      </div>
    </div>
  )
}
