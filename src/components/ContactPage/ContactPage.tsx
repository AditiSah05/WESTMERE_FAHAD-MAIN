import ContactForm from './ContactForm'
import ContactHeader from './ContactHeader'
import ContactInfo from './ContactInfo'
import ContactMap from './ContactMap'

export default function ContactPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-paper pb-[100px] pt-[90px] text-[#4a5568] min-[769px]:pt-[120px]">
      <div className="mx-auto w-full max-w-[1200px] px-8">
        <ContactHeader />
        <div className="grid grid-cols-1 items-start gap-10 min-[1025px]:grid-cols-[1.1fr_1.3fr] min-[1025px]:gap-[50px]">
          <div className="flex flex-col gap-[30px]">
            <ContactInfo />
            <ContactMap />
          </div>
          <ContactForm />
        </div>
      </div>
    </div>
  )
}
