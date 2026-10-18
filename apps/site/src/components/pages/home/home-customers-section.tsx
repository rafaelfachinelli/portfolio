import { Card } from '@datum/ui'
import Image from 'next/image'

type CustomerItem = {
  image: string
  alt: string
  name: string
  description: string
}

type HomeCustomersSectionProps = {
  eyebrow: string
  title: string
  subtitle: string
  customers: CustomerItem[]
}

export function HomeCustomersSection({
  eyebrow,
  title,
  subtitle,
  customers,
}: Readonly<HomeCustomersSectionProps>) {
  return (
    <section>
      <Card className="border-white/10 bg-black/55 p-6 md:p-8 dark:bg-black/30">
        <div className="mb-6 space-y-3">
          <p className="text-sm font-medium tracking-[0.3em] text-white/60 uppercase">
            {eyebrow}
          </p>
          <h2 className="text-3xl font-bold text-white md:text-4xl">{title}</h2>
          <p className="max-w-2xl text-white/75">{subtitle}</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {customers.map(customer => (
            <Card
              key={customer.name}
              className="border-white/10 bg-white/10 p-5 dark:bg-white/5"
            >
              <div className="flex h-full flex-col gap-5">
                <div className="flex min-h-16 items-center">
                  <Image
                    src={customer.image}
                    alt={customer.alt}
                    width={160}
                    height={56}
                    className="h-auto max-h-12 w-auto"
                  />
                </div>
                <div className="space-y-2">
                  <p className="text-lg font-semibold text-white">
                    {customer.name}
                  </p>
                  <p className="text-sm leading-6 text-white/70">
                    {customer.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Card>
    </section>
  )
}
