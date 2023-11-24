import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { Session, createClient } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'
import * as styles from "./styles"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL ?? '', process.env.NEXT_PUBLIC_SUPABASE_PUBLIC_ANON_KEY ?? '')

export const Developers = () => {
    const [loading, setLoading] = useState(false);

    const [session, setSession] = useState<Session | null>();

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })

        return () => subscription.unsubscribe()
    }, [])

    useEffect(() => {
        console.log(session)
    }, [session])

    async function signOut() {
        setLoading(true);
        const { error } = await supabase.auth.signOut()
        setLoading(false);
        console.error(error)
        throw error
    }


    return <div className={styles.main}>
        {!session ?
            <div className={styles.auth}>
                <Auth supabaseClient={supabase} providers={[]} redirectTo='https://www.google.com/' appearance={{ theme: ThemeSupa }} />
            </div> :

            <div>Authenticated<button onClick={signOut}>Sign Out</button></div>}
    </div>
}