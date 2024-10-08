import React from 'react'

import { Dialog, DialogContent } from '@components/ui/dialog'
import { conditionSocial, urlSocial } from '@constants/conditionSocial'
import { TaskItem } from '@interfaces/task.interface'

interface DialogConfirmProps {
  task: TaskItem
  isShow: boolean
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>
  onShowDialog: (value: boolean) => void
  onClickAction: (task: TaskItem, url: string) => void
}

const DialogConfirm: React.FC<DialogConfirmProps> = ({ task, isShow, setIsShow, onShowDialog, onClickAction }) => {
  const urlSocialMapping: Record<number, string> = {
    [conditionSocial.YOUTUBE]: urlSocial.YOUTUBE,
    [conditionSocial.TIKTOK]: urlSocial.TIKTOK,
    [conditionSocial.TELEGRAM]: urlSocial.TELEGRAM
  }

  return (
    <Dialog open={isShow} onOpenChange={setIsShow}>
      <DialogContent
        className='w-[80%] rounded-xl bg-[#EFEFF3]'
        onInteractOutside={(e) => {
          e.preventDefault()
        }}
      >
        <div>
          <p className='text-center font-semibold'>Open Link</p>
          <p className='text-center'>Do you want to open "{urlSocialMapping[task.social_type_id] || ''}"?</p>
          <div className='w-full inline-flex justify-around mt-4'>
            <button className='bg-white py-3 px-12 rounded-lg' onClick={() => onShowDialog(false)}>
              Cancel
            </button>
            <button
              className='bg-[#2381CC] py-3 px-12 rounded-lg text-white'
              onClick={() => onClickAction(task, urlSocialMapping[task.social_type_id] || '')}
            >
              Open
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default DialogConfirm
