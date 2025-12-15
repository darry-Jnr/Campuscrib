'use client'

interface HeadingProps {
    title: string;
    subtitle?: string;
    center?: boolean;
}

const Heading = ({title, subtitle, center}: HeadingProps) => {
  return (
    <div className={center? `text-center` : `text-start`}>
        <div className="text-base font-medium md:text-2xl md:font-bold">
        {title}
        </div>
    <div className="font-light text-neutral-500 mt-2">
        {subtitle}
    </div>
    </div>
  )
}

export default Heading