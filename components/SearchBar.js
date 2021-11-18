import create from 'zustand';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from '../styles/Header.module.scss';
import loupe from '../public/images/loupe.png';

const useStore = create((set) => ({
  keyword: '',
  setKeyword: (keyword) =>
    set((state) => ({
      ...state,
      keyword,
    })),
}));

const SearchBar = () => {
  const router = useRouter();
  const keyword = useStore((state) => state.keyword);
  const setKeyword = useStore((state) => state.setKeyword);

  const handleClick = (e) => {
    e.preventDefault();
    router.push('/searchResults');
  };

  return (
    <div className={styles.searchBar}>
      <input
        type='text'
        value={keyword}
        placeholder='Suche...'
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button className={styles.searchBtn} type='submit' onClick={handleClick}>
        <Image src={loupe} alt='' />
      </button>
    </div>
  );
};

export default SearchBar;