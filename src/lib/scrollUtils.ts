
export function scrollToSection(id: string, retries = 10) {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  } else if (retries > 0) {
    setTimeout(() => scrollToSection(id, retries - 1), 100)
  }
}