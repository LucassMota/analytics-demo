'use client'

import { useState } from 'react'
import ChatInput from './ChatInput'
import { ChatMessages } from './ChatMessages'
import { useChat } from './controller'
import SourcesSidebar from './SourcesSidebar'
import { ArrowLeftToLine } from 'lucide-react'
import SQLViewer from './SourcesSidebar/SQLViewer'

export const Chat = () => {
  const { handleSend, messages, lastMessage } = useChat()
  const [openSources, setOpenSources] = useState<boolean>(false)

  return (
    <div className="h-full w-full flex flex-row">
      <div className="flex flex-col items-center w-full">
        <div className="flex-1 w-[800px] overflow-y-auto">
          <ChatMessages messages={messages} />
        </div>
        <div className="pt-4 px-4 w-[800px]">
          <ChatInput onSend={handleSend} />
        </div>
      </div>
      <div
        className="items-center justify-center
        p-4 w-[84px] bg-[var(--gray-light-mode-25)] text-[var(--gray-light-mode-900)]
        dark:bg-[var(--gray-dark-mode-900)] dark:text-[var(--gray-dark-mode-25)]
        border-l border-[var(--gray-light-mode-300)] dark:border-transparent"
      >
        <div
          className="flex w-fit items-center justify-center p-2
          dark:bg-[var(--gray-dark-mode-700)]
          bg-[var(--gray-dark-mode-400)]
          dark:text-[var(--gray-dark-mode-25)]
          rounded-full
          "
        >
          <ArrowLeftToLine
            onClick={() => setOpenSources(!openSources)}
            className="w-5 h-5 cursor-pointer"
          />
        </div>
      </div>
      <SourcesSidebar
        title="Sources"
        open={openSources}
        onOpenChangeAction={setOpenSources}
        showFloatingToggle={false}
      >
        {
          <SQLViewer
            sql={
              "```sql\nSELECT \n  d.english_month_name, \n  d.month_number_of_year, \n  SUM(fis.sales_amount) AS total_sales\nFROM FACT_INTERNET_SALES fis\nJOIN DIM_DATE d ON fis.order_date_key = d.date_key\nJOIN DIM_CUSTOMER c ON fis.customer_key = c.customer_key\nWHERE c.customer_alternate_key = 'NVIDIA Corporation'\nGROUP BY d.english_month_name, d.month_number_of_year\nORDER BY total_sales DESC;\sql\nSELECT \n  d.english_month_name, \n  d.month_number_of_year, \n  SUM(fis.sales_amount) AS total_sales\nFROM FACT_INTERNET_SALES fis\nJOIN DIM_DATE d ON fis.order_date_key = d.date_key\nJOIN DIM_CUSTOMER c ON fis.customer_key = c.customer_key\nWHERE c.customer_alternate_key = 'NVIDIA Corporation'\nGROUP BY d.english_month_name, d.month_number_of_year\nORDER BY total_sales DESC;\nsql\nSELECT \n  d.english_month_name, \n  d.month_number_of_year, \n  SUM(fis.sales_amount) AS total_sales\nFROM FACT_INTERNET_SALES fis\nJOIN DIM_DATE d ON fis.order_date_key = d.date_key\nJOIN DIM_CUSTOMER c ON fis.customer_key = c.customer_key\nWHERE c.customer_alternate_key = 'NVIDIA Corporation'\nGROUP BY d.english_month_name, d.month_number_of_year\nORDER BY total_sales DESC;\nsql\nSELECT \n  d.english_month_name, \n  d.month_number_of_year, \n  SUM(fis.sales_amount) AS total_sales\nFROM FACT_INTERNET_SALES fis\nJOIN DIM_DATE d ON fis.order_date_key = d.date_key\nJOIN DIM_CUSTOMER c ON fis.customer_key = c.customer_key\nWHERE c.customer_alternate_key = 'NVIDIA Corporation'\nGROUP BY d.english_month_name, d.month_number_of_year\nORDER BY total_sales DESC;\nsql\nSELECT \n  d.english_month_name, \n  d.month_number_of_year, \n  SUM(fis.sales_amount) AS total_sales\nFROM FACT_INTERNET_SALES fis\nJOIN DIM_DATE d ON fis.order_date_key = d.date_key\nJOIN DIM_CUSTOMER c ON fis.customer_key = c.customer_key\nWHERE c.customer_alternate_key = 'NVIDIA Corporation'\nGROUP BY d.english_month_name, d.month_number_of_year\nORDER BY total_sales DESC;\nsql\nSELECT \n  d.english_month_name, \n  d.month_number_of_year, \n  SUM(fis.sales_amount) AS total_sales\nFROM FACT_INTERNET_SALES fis\nJOIN DIM_DATE d ON fis.order_date_key = d.date_key\nJOIN DIM_CUSTOMER c ON fis.customer_key = c.customer_key\nWHERE c.customer_alternate_key = 'NVIDIA Corporation'\nGROUP BY d.english_month_name, d.month_number_of_year\nORDER BY total_sales DESC;\nsql\nSELECT \n  d.english_month_name, \n  d.month_number_of_year, \n  SUM(fis.sales_amount) AS total_sales\nFROM FACT_INTERNET_SALES fis\nJOIN DIM_DATE d ON fis.order_date_key = d.date_key\nJOIN DIM_CUSTOMER c ON fis.customer_key = c.customer_key\nWHERE c.customer_alternate_key = 'NVIDIA Corporation'\nGROUP BY d.english_month_name, d.month_number_of_year\nORDER BY total_sales DESC;\nsql\nSELECT \n  d.english_month_name, \n  d.month_number_of_year, \n  SUM(fis.sales_amount) AS total_sales\nFROM FACT_INTERNET_SALES fis\nJOIN DIM_DATE d ON fis.order_date_key = d.date_key\nJOIN DIM_CUSTOMER c ON fis.customer_key = c.customer_key\nWHERE c.customer_alternate_key = 'NVIDIA Corporation'\nGROUP BY d.english_month_name, d.month_number_of_year\nORDER BY total_sales DESC;\nsql\nSELECT \n  d.english_month_name, \n  d.month_number_of_year, \n  SUM(fis.sales_amount) AS total_sales\nFROM FACT_INTERNET_SALES fis\nJOIN DIM_DATE d ON fis.order_date_key = d.date_key\nJOIN DIM_CUSTOMER c ON fis.customer_key = c.customer_key\nWHERE c.customer_alternate_key = 'NVIDIA Corporation'\nGROUP BY d.english_month_name, d.month_number_of_year\nORDER BY total_sales DESC;\nsql\nSELECT \n  d.english_month_name, \n  d.month_number_of_year, \n  SUM(fis.sales_amount) AS total_sales\nFROM FACT_INTERNET_SALES fis\nJOIN DIM_DATE d ON fis.order_date_key = d.date_key\nJOIN DIM_CUSTOMER c ON fis.customer_key = c.customer_key\nWHERE c.customer_alternate_key = 'NVIDIA Corporation'\nGROUP BY d.english_month_name, d.month_number_of_year\nORDER BY total_sales DESC;\nsql\nSELECT \n  d.english_month_name, \n  d.month_number_of_year, \n  SUM(fis.sales_amount) AS total_sales\nFROM FACT_INTERNET_SALES fis\nJOIN DIM_DATE d ON fis.order_date_key = d.date_key\nJOIN DIM_CUSTOMER c ON fis.customer_key = c.customer_key\nWHERE c.customer_alternate_key = 'NVIDIA Corporation'\nGROUP BY d.english_month_name, d.month_number_of_year\nORDER BY total_sales DESC;\nsql\nSELECT \n  d.english_month_name, \n  d.month_number_of_year, \n  SUM(fis.sales_amount) AS total_sales\nFROM FACT_INTERNET_SALES fis\nJOIN DIM_DATE d ON fis.order_date_key = d.date_key\nJOIN DIM_CUSTOMER c ON fis.customer_key = c.customer_key\nWHERE c.customer_alternate_key = 'NVIDIA Corporation'\nGROUP BY d.english_month_name, d.month_number_of_year\nORDER BY total_sales DESC;\nsql\nSELECT \n  d.english_month_name, \n  d.month_number_of_year, \n  SUM(fis.sales_amount) AS total_sales\nFROM FACT_INTERNET_SALES fis\nJOIN DIM_DATE d ON fis.order_date_key = d.date_key\nJOIN DIM_CUSTOMER c ON fis.customer_key = c.customer_key\nWHERE c.customer_alternate_key = 'NVIDIA Corporation'\nGROUP BY d.english_month_name, d.month_number_of_year\nORDER BY total_sales DESC;\nsql\nSELECT \n  d.english_month_name, \n  d.month_number_of_year, \n  SUM(fis.sales_amount) AS total_sales\nFROM FACT_INTERNET_SALES fis\nJOIN DIM_DATE d ON fis.order_date_key = d.date_key\nJOIN DIM_CUSTOMER c ON fis.customer_key = c.customer_key\nWHERE c.customer_alternate_key = 'NVIDIA Corporation'\nGROUP BY d.english_month_name, d.month_number_of_year\nORDER BY total_sales DESC;\nsql\nSELECT \n  d.english_month_name, \n  d.month_number_of_year, \n  SUM(fis.sales_amount) AS total_sales\nFROM FACT_INTERNET_SALES fis\nJOIN DIM_DATE d ON fis.order_date_key = d.date_key\nJOIN DIM_CUSTOMER c ON fis.customer_key = c.customer_key\nWHERE c.customer_alternate_key = 'NVIDIA Corporation'\nGROUP BY d.english_month_name, d.month_number_of_year\nORDER BY total_sales DESC;\nsql\nSELECT \n  d.english_month_name, \n  d.month_number_of_year, \n  SUM(fis.sales_amount) AS total_sales\nFROM FACT_INTERNET_SALES fis\nJOIN DIM_DATE d ON fis.order_date_key = d.date_key\nJOIN DIM_CUSTOMER c ON fis.customer_key = c.customer_key\nWHERE c.customer_alternate_key = 'NVIDIA Corporation'\nGROUP BY d.english_month_name, d.month_number_of_year\nORDER BY total_sales DESC;\nsql\nSELECT \n  d.english_month_name, \n  d.month_number_of_year, \n  SUM(fis.sales_amount) AS total_sales\nFROM FACT_INTERNET_SALES fis\nJOIN DIM_DATE d ON fis.order_date_key = d.date_key\nJOIN DIM_CUSTOMER c ON fis.customer_key = c.customer_key\nWHERE c.customer_alternate_key = 'NVIDIA Corporation'\nGROUP BY d.english_month_name, d.month_number_of_year\nORDER BY total_sales DESC;\nsql\nSELECT \n  d.english_month_name, \n  d.month_number_of_year, \n  SUM(fis.sales_amount) AS total_sales\nFROM FACT_INTERNET_SALES fis\nJOIN DIM_DATE d ON fis.order_date_key = d.date_key\nJOIN DIM_CUSTOMER c ON fis.customer_key = c.customer_key\nWHERE c.customer_alternate_key = 'NVIDIA Corporation'\nGROUP BY d.english_month_name, d.month_number_of_year\nORDER BY total_sales DESC;\nsql\nSELECT \n  d.english_month_name, \n  d.month_number_of_year, \n  SUM(fis.sales_amount) AS total_sales\nFROM FACT_INTERNET_SALES fis\nJOIN DIM_DATE d ON fis.order_date_key = d.date_key\nJOIN DIM_CUSTOMER c ON fis.customer_key = c.customer_key\nWHERE c.customer_alternate_key = 'NVIDIA Corporation'\nGROUP BY d.english_month_name, d.month_number_of_year\nORDER BY total_sales DESC;\nsql\nSELECT \n  d.english_month_name, \n  d.month_number_of_year, \n  SUM(fis.sales_amount) AS total_sales\nFROM FACT_INTERNET_SALES fis\nJOIN DIM_DATE d ON fis.order_date_key = d.date_key\nJOIN DIM_CUSTOMER c ON fis.customer_key = c.customer_key\nWHERE c.customer_alternate_key = 'NVIDIA Corporation'\nGROUP BY d.english_month_name, d.month_number_of_year\nORDER BY total_sales DESC;\nn```"
            }
          />
        }
      </SourcesSidebar>
    </div>
  )
}

export default Chat
