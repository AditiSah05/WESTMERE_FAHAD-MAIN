import ContactForm from './ContactForm'
import ContactHeader from './ContactHeader'
import ContactInfo from './ContactInfo'
import ContactMap from './ContactMap'

export default function ContactPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-paper pb-10 pt-[90px] text-[#4a5568] min-[769px]:pt-[120px]">
      <div className="mx-auto w-full max-w-[1040px] px-4 min-[769px]:px-8">
        <ContactHeader />
        <div className="rounded-[32px] border border-navy-deep bg-mist p-3 min-[769px]:p-[18px]">
          <div className="grid grid-cols-1 overflow-hidden rounded-2xl bg-white min-[1025px]:grid-cols-2 min-[1025px]:divide-x min-[1025px]:divide-line">
            <div className="flex flex-col gap-5 p-5 min-[769px]:p-7">
              <ContactInfo />
              <ContactMap />
            </div>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  )
}
