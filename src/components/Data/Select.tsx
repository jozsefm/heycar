import { useMemo, useState } from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import styled from 'styled-components'

const Select = styled(Dropdown)`
  width: 175px;

  button {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #1bc5bd !important;
    border-color: #1bc5bd !important;

    &::after {
      display: inline-block;
      margin-left: 0.6em;
      vertical-align: 0em;
      content: '';
      border-top: 0.5em solid;
      border-right: 0.5em solid transparent;
      border-bottom: 0;
      border-left: 0.5em solid transparent;
    }

    &:focus {
      box-shadow: none !important;
    }
  }

  & > button {
    border-radius: 6px;
  }
`

const SelectMenu = styled(Dropdown.Menu)`
  width: 175px;
  padding: 0;
  border-radius: 6px;
  border: none;

  button {
    color: white;
  }

  button:first-of-type {
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
  }

  button:last-of-type {
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
  }

  button::after {
    content: none;
  }
`

export default function SelectComponent({ list, placeholder, onChange }) {
  const [current, setCurrent] = useState(null)

  const selectHandlers = useMemo(() => {
    return list.map((curr) => {
      return () => {
        setCurrent(curr)
        onChange(curr)
      }
    }, {})
  }, [list, onChange])

  return (
    <Select>
      <Dropdown.Toggle variant="success" id={`${list[0]}-dropdown`}>
        {current?.name || placeholder}
      </Dropdown.Toggle>

      <SelectMenu>
        {list.map((item, index) => (
          <Dropdown.Item as="button" onClick={selectHandlers[index]} key={item.name}>
            {item.name}
          </Dropdown.Item>
        ))}
      </SelectMenu>
    </Select>
  )
}
