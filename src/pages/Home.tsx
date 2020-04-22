import React, { useState, useEffect } from 'react'
import moment from 'moment'
import Layout from '../components/Layouts'
import config from '../config'
import { IonList, IonItem, IonLabel, IonSkeletonText } from '@ionic/react'

type WPPost = {
    id: number;
    date: string;
    date_gmt: string;
    guid: {
        rendered: string;
    }
    modified: string;
    modified_gmt: string;
    slug: string;
    title: {
        rendered: string;
    }
    excerpt: {
        rendered: string;
    }
    content: {
        rendered: string;
    }
}

const ListPost: React.FC<{
    posts: WPPost[]
}> = ({posts}) => {
    if (!posts || posts.length < 1) {
        return (
            <IonList>
                <IonItem>
                    <IonLabel>
                        <h3><IonSkeletonText animated /></h3>
                        <p><IonSkeletonText animated /></p>
                    </IonLabel>
                </IonItem>
                <IonItem>
                    <IonLabel>
                        <h3><IonSkeletonText animated /></h3>
                        <p><IonSkeletonText animated /></p>
                    </IonLabel>
                </IonItem>
                <IonItem>
                    <IonLabel>
                        <h3><IonSkeletonText animated /></h3>
                        <p><IonSkeletonText animated /></p>
                    </IonLabel>
                </IonItem>
                <IonItem>
                    <IonLabel>
                        <h3><IonSkeletonText animated /></h3>
                        <p><IonSkeletonText animated /></p>
                    </IonLabel>
                </IonItem>
                <IonItem>
                    <IonLabel>
                        <h3><IonSkeletonText animated /></h3>
                        <p><IonSkeletonText animated /></p>
                    </IonLabel>
                </IonItem>
                <IonItem>
                    <IonLabel>
                        <h3><IonSkeletonText animated /></h3>
                        <p><IonSkeletonText animated /></p>
                    </IonLabel>
                </IonItem>
            </IonList>
        )
    }
    return (
        <IonList>
            {posts.map(post => (
                <IonItem key={post.id} routerLink={`/pages/${post.slug}`}>
                    <IonLabel>
                        <h3 dangerouslySetInnerHTML={{__html: post.title.rendered}} />
                        <p>
                            Published: {moment(post.date).format('MMMM Do YYYY')}<br/>
                            Modified: {moment(post.modified).format('MMMM Do YYYY')}
                        </p>
                    </IonLabel>
                </IonItem>
            ))}
        </IonList>
    )
}

const Home: React.FC = () => {
    const [posts, setPosts] = useState<WPPost[]>([])
    useEffect(() => {
        config.wpClient.posts().perPage(30).then(data => {
            setPosts(data)
        })
    }, [])
    return (
        <Layout name="Home">
            <ListPost posts={posts} />
            <IonList>
                {posts.map(post => (
                    <IonItem key={post.id} routerLink={`/pages/${post.slug}`}>
                        <IonLabel>
                            <h3 dangerouslySetInnerHTML={{__html: post.title.rendered}} />
                            <p>
                                Published: {moment(post.date).format('MMMM Do YYYY')}<br/>
                                Modified: {moment(post.modified).format('MMMM Do YYYY')}
                            </p>
                        </IonLabel>
                    </IonItem>
                ))}
                </IonList>
        </Layout>
    )
}

export default Home