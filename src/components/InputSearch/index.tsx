import React, { useRef } from 'react'

import { AllHeroes } from 'core/utils/heroes'

import SearchIcon from 'assets/busca/Lupa/Shape@1,5x.svg'
import useOutsideAlerter from 'core/utils/hooks/useOutsideAlerter'

import {
  InputWrapper,
  StyledInput,
  SugestionButtonItem,
  SugestionItemStyleSpan,
  SugestionsList
} from './styled'

export interface SearchInputProps {
  isSecondary?: boolean
  isSugestionsOpen?: boolean
  label: string
  placeholder: string
  name?: string
  sugestions?: AllHeroes[]
  value: string
  onChange?: (value: string) => void
  onInputFocus?: () => void
  onSugestionsCloseClick?: (sugestion: AllHeroes | undefined) => void
}

export default function SearchInput({
  isSecondary = false,
  isSugestionsOpen = false,
  label,
  placeholder,
  name = 'search',
  sugestions,
  onChange,
  onInputFocus,
  onSugestionsCloseClick
}: SearchInputProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  useOutsideAlerter(
    wrapperRef,
    () => onSugestionsCloseClick && onSugestionsCloseClick(undefined)
  )

  const isSugestionOpen =
    isSugestionsOpen &&
    sugestions &&
    sugestions?.length > 0 &&
    sugestions[0].name

  return (
    <div style={{ position: 'relative', width: '100%' }} ref={wrapperRef}>
      <InputWrapper className='input' isSecondary={isSecondary}>
        <img src={SearchIcon} alt='Input search logo' />
        <StyledInput
          onFocus={onInputFocus}
          isSecondary={isSecondary}
          isSugestionsOpen={isSugestionOpen ? true : false}
          placeholder={placeholder}
          name={name}
          onChange={event => onChange && onChange(event.target.value)}
        />
        <label htmlFor={name}>{label}</label>
      </InputWrapper>
      {isSugestionOpen && (
        <SugestionsList
          isSecondary={isSecondary}
          style={{ position: 'absolute', width: '100%' }}>
          {sugestions &&
            sugestions.map(sugestion => (
              <li key={sugestion.name}>
                {typeof sugestion.id === 'number' ? (
                  <SugestionButtonItem
                    to={`/hero/${sugestion.id}`}
                    onClick={() =>
                      onSugestionsCloseClick &&
                      onSugestionsCloseClick(sugestion)
                    }>
                    {sugestion.name}
                  </SugestionButtonItem>
                ) : (
                  <SugestionItemStyleSpan
                    onClick={() =>
                      onSugestionsCloseClick &&
                      onSugestionsCloseClick(sugestion)
                    }>
                    {sugestion.name}
                  </SugestionItemStyleSpan>
                )}
              </li>
            ))}
        </SugestionsList>
      )}
    </div>
  )
}
