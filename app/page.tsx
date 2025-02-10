'use client'
import Image from 'next/image'
import styles from './page.module.css'
import mainImage from '@/assets/images/main_image.png'
import { Button, Form, Spinner } from 'react-bootstrap'
import { FormEvent, useState } from 'react'

export default function Home() {

  const [quote, setQuote] = useState("")
  const [quoteLoading, setQuoteLoading] = useState(false)
  const [quoteLoadingError, setQuoteLoadingError] = useState(false)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const prompt = formData.get("prompt")?.toString().trim()

    if (prompt) {
      try {
        setQuote('')
        setQuoteLoadingError(false)
        setQuoteLoading(true)

        const response = await fetch('/api/motto?prompt=' + encodeURIComponent(prompt))
        const body = await response.json()
        setQuote(body.quote)

      } catch (error) {
        console.error(error)
        setQuoteLoadingError(true)
      } finally {
        setQuoteLoading(false);
      }
    }

  }

  return (
    <main className={styles.main}>
      <h1>Motto AI</h1>
      <h2>powered by DeepSeek-R1</h2>
      <div>Enter a topic and the AI will generate a super motivational quote.</div>
      <div className={styles.mainImageContainer}>
        <Image
          src={mainImage}
          fill
          alt='Motto AI'
          priority
          className={styles.mainImage}
        />
      </div>
      <Form onSubmit={handleSubmit} className={styles.inputForm}>
        <Form.Group className='mb-3' controlId='prompt-input'>
          <Form.Label>Create a motto quote about...</Form.Label>
          <Form.Control
            name='prompt'
            placeholder='e.g. success, fear, potatoes'
            maxLength={100}
          />
        </Form.Group>
        <Button type='submit' className='mb-3' disabled={quoteLoading}>
          Make me motto
        </Button>
      </Form>
      {quoteLoading && <Spinner animation='border'></Spinner>}
      {quoteLoadingError && <div>Something went wrong. Please try again.</div>}
      {quote && <h5 className={styles.quote}>{quote}</h5>}
    </main>
  )
}
