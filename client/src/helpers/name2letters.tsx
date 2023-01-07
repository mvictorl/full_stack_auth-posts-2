export const name2letters = (name: string): string => {
  let letters = ""

  if (name) {
    const arr = name.split(" ")
    letters = arr[0].charAt(0).toUpperCase()

    if (arr.length > 1) {
      letters += arr[1].charAt(0).toUpperCase()
    }
  }

  return letters
}
