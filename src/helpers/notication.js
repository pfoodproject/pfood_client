import { useToasts } from 'react-toast-notifications'

const { addToast } = useToasts()

export const  toast  = (content, type) => {
    addToast(content, {
        appearance: type,
        autoDismiss: true,
      })
}

