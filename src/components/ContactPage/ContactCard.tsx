import ContactForm from './ContactForm'
import ContactInfo from './ContactInfo'
import ContactSteps from './ContactSteps'

/** Framed card: details on the left, form on the right, split by a hairline. */
export default function ContactCard() {
  return (
    <div className="relative rounded-2xl bg-mist p-5 shadow-[inset_0_0_6px_rgba(15,27,51,0.18)] after:pointer-events-none after:absolute after:inset-0 after:rounded-2xl after:border after:border-ink after:content-['']">
      <div className="grid grid-cols-1 overflow-hidden rounded-lg bg-white min-[769px]:grid-cols-2">
        <div className="flex flex-col gap-5 p-5">
          <ContactInfo />
          <ContactSteps />
        </div>
        <div className="border-t border-line p-5 min-[769px]:border-l min-[769px]:border-t-0">
          <ContactForm />
        </div>
      </div>
    </div>
  )
}
