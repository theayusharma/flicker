import React from "react"
type Props = {
  name: string;
  buttonComponent?: any;
  isSmallText?: boolean;
}

const Header = ({
  name, buttonComponent, isSmallText = false
}: Props) => {

  return (
    <div className="flex w-full 4xl justify-between mb-4" >
      <h1 className={`sm:text-4xl text-3xl font-bold  dark:text-white `}>
        {name}
      </h1>
      {buttonComponent}
    </div>

  )
}

export default Header
