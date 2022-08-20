import {FC} from 'react'

import styles from './Checkers.module.scss'
import {Board} from './components/Board'

export const Checkers: FC = () => {
    return (
        <div className={styles.container}>
            <Board/>
        </div>
    )
}
