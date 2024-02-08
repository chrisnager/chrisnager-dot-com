/** @jsx jsx */

import { useLocation } from '@reach/router'
import { navigate } from 'gatsby'
import { FC, Fragment } from 'react'
import { jsx } from 'theme-ui'

import Halo from '../../../components/halo'

export interface SystemUiCharacterProps {
  location: any
}

const SystemUiCharacter: FC<SystemUiCharacterProps> = ({ location }) => {
  const character = location.pathname.split('/').slice(-2)[0]

  if (!character) navigate(`/system-ui`)

  return character
}

export default SystemUiCharacter

export const Head = () => {
  const location = useLocation()

  const character = location.pathname.split('/').slice(-2)[0]

  if (!character) navigate(`/system-ui`)

  return <Halo title={`${character} / System UI`} url={`https://chrisnager.com/system-ui/characters/${character}`} />
}

