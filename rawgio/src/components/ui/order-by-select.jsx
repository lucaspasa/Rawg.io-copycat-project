"use client"

import { Portal, Select, createListCollection } from "@chakra-ui/react"
import { useState, useEffect } from "react"

const OrderBySelect = ({sendDataToParent}) => {
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
          <Select.ValueText placeholder="Order By: Relavence" />
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
    { label: "Order By: Relevance", value: "Default" },
    { label: "Order By: Name", value: "name" },
    { label: "Order By: Release date", value: "released" },
    { label: "Order By: Popularity", value: "-rating" },
    { label: "Order By: Average rating", value: "-metacritic" },
  ],
})

export default OrderBySelect;
