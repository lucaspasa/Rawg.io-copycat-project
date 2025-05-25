"use client"

import { Portal, Select, createListCollection } from "@chakra-ui/react"
import { useState, useEffect } from "react"

const PlatformSelect = ({sendDataToParent}) => {
  const [value, setValue] = useState([])

useEffect(() => {
  
      sendDataToParent(value)
    
  }, [value])

  return (
    <Select.Root
      collection={frameworks}
      width="320px"
      value={value}
      onValueChange={(e) => setValue(e.value)}
      className="select"
    >
      <Select.HiddenSelect />
      <Select.Label></Select.Label>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Platforms" />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            {frameworks.items.map((framework) => (
              <Select.Item item={framework} key={framework.value}>
                {framework.label}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  )
}

const frameworks = createListCollection({
  items: [
    { label: "PC", value: "1" },
    { label: "Playstation", value: "2" },
    { label: "Xbox", value: "3" },
    { label: "Andriod", value: "8" },
    { label: "Apple Macintosh", value: "4,5" },
    { label: "Linux", value: "6" },
    { label: "Nintendo", value: "7" },
    { label: "All Platforms", value: "1,2,3,4,5,6,7,8,9" },
  ],
})

export default PlatformSelect;
