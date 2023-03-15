import { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import css from './Searchbar.module.css';
import PropTypes from 'prop-types';

const Searchbar = ({onSubmit}) => {
    const [search, setSearch] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
         if (search.trim() === '') {
             return alert('Searchfield is empty. Please, enter your request.');
        } 
        onSubmit(search.trim());
        setSearch('');
    }

    const handleChange = e => setSearch(e.target.value);

    return (
        <header className={css.searchbar}>
            <form className={css.form} onSubmit={handleSubmit}>
                <button type="submit" className={css.button}>
                        <span className={css.button_label}></span>
                        <AiOutlineSearch size="24px" />
                </button>

                <input
                    className={css.input}
                    onChange={handleChange}
                    value={search}
                    name="search"
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                />
            </form>
        </header>);
    
};

export default Searchbar;

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}
