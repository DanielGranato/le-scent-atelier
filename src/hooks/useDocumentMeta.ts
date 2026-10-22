import { useEffect } from 'react'

interface DocumentMeta {
  title: string
  description: string
}

/** Sets the tab title and the meta description while a page is shown, and restores them on leave. */
export function useDocumentMeta({ title, description }: DocumentMeta): void {
  useEffect(() => {
    const previousTitle = document.title
    document.title = title

    let tag = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    const created = !tag
    if (!tag) {
      tag = document.createElement('meta')
      tag.name = 'description'
      document.head.appendChild(tag)
    }
    const previousDescription = tag.content
    tag.content = description

    return () => {
      document.title = previousTitle
      if (created) tag.remove()
      else tag.content = previousDescription
    }
  }, [title, description])
}
