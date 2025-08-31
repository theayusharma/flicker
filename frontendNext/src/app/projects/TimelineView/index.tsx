import TimeLine from "@/components/TimeLine"

type Props = {
  id: string,
  setIsModalNewTaskOpen: (isOpen: boolean) => void
}

const TimeLineView = ({ id, setIsModalNewTaskOpen }: Props) => {
  return (
    <div>
      <div>
        timeline
      </div>
      <TimeLine id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
    </div>
  )
}

export default TimeLineView 
