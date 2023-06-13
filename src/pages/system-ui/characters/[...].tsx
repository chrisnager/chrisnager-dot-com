/** @jsx jsx */

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

  return (
    <Fragment>
      <Halo title={`${character} / System UI`} url={`https://chrisnager.com/system-ui/characters/${character}`} />

      {character}
    </Fragment>
  )
}

export default SystemUiCharacter
