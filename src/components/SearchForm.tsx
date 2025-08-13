import Form from 'next/form'
import { Input } from '@/components/ui/input'
import SearchButton from '@/components/SearchButton'

type Props ={
    searchType: string
    className?: string
    placeholder?: string
}

export default function SearchForm({ searchType, className, placeholder } : Props) {
    return (
        <Form
            action={`/dashboard${searchType}`}
            className={`flex gap-2 items-center w-xs lg:w-md xl:w-xl ${className}`}
        >
            <Input
                name="searchText"
                type="text"
                placeholder={`Search ${placeholder}`}
                className="md:h-12 w-full"
            />
            <SearchButton />
        </Form>
    )
}