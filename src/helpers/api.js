export default function fetchWord(word) {
  const url = `https://lingua-robot.p.rapidapi.com/language/v1/entries/en/${word}`

  return fetch(url, {
    headers: {
      'x-rapidapi-key': 'b79555e209mshf719b350f0236cbp1f11a6jsnd0b4b857dbee',
      'x-rapidapi-host': 'lingua-robot.p.rapidapi.com',
      'useQueryString': true
    }
  })
  .then((res) => {
    return res.json()
  })
  .catch((err) => {
    throw new Error(err)
  })
}
