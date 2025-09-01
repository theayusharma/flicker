import TimeLine from "@/components/TimeLine"

type Props = {
  id: string,
  setIsModalNewTaskOpen: (isOpen: boolean) => void
}

const TimeLineView = ({ id, setIsModalNewTaskOpen }: Props) => {
  return (
    <TimeLine id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
  )
}

export default TimeLineView 
