const baseUrl = "https://opentdb.com/api.php?amount=10"

export async function getGenQuestions(){
  const res = await fetch(`${baseUrl}&category=9&difficulty=medium&type=multiple`)
  return res.json()
}