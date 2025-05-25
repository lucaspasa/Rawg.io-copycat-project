import { ProgressCircle } from "@chakra-ui/react"

const Loading = () => {
  return (
    <ProgressCircle.Root className="loading-cards" value={null} size="xl">
      <ProgressCircle.Circle>
        <ProgressCircle.Track />
        <ProgressCircle.Range />
      </ProgressCircle.Circle>
    </ProgressCircle.Root>
  )
}

export default Loading