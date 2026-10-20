import {
  type Answers,
  DEFAULT_ANSWERS,
  QUESTION_IDS,
  QUESTIONS,
} from './questions'

// A share code is a version digit followed by one digit per question (the
// option's position), e.g. "11100000100". It holds no personal data, so it can
// sit in the URL. A new question or option order means a new version.
const VERSION = '1'

export function encodeAnswers(answers: Answers): string {
  return (
    VERSION +
    QUESTION_IDS.map(question =>
      (QUESTIONS[question] as readonly string[]).indexOf(answers[question]),
    ).join('')
  )
}

/** The answers in a share code, or null when the code is not valid. */
export function decodeAnswers(code: string): Answers | null {
  if (code.length !== QUESTION_IDS.length + 1 || code[0] !== VERSION) {
    return null
  }

  const answers: Record<string, string> = { ...DEFAULT_ANSWERS }
  for (const [index, question] of QUESTION_IDS.entries()) {
    const options = QUESTIONS[question] as readonly string[]
    const position = Number(code[index + 1])
    if (!Number.isInteger(position) || !options[position]) return null
    answers[question] = options[position]
  }
  return answers as Answers
}
