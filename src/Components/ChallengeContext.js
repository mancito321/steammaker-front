import { createContext } from 'react'

const ChallengeContext = createContext({})
export const ChallengePro = ChallengeContext.Provider
export const ChallengeCon = ChallengeContext.Consumer
