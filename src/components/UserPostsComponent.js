import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import React, { useEffect, useState } from 'react'

export default function UserPostsComponent({ user }) {
    const [userPosts, setUserPosts] = useState([]); // Seçilen kullanıcının postlarını tutar
    const [visible, setVisible] = useState(false); // Dialog'un görünürlüğünü kontrol eder
    useEffect(() => {
        const fetchUserPosts = async () => {
            // Asenkron fonksiyon tanımlanır
            if (user) {
                // Eğer user doluysa
                const userPostApi = `https://jsonplaceholder.typicode.com/posts?userId=${user.id}`; // API URL'i oluşturulur
                try {
                    const response = await fetch(userPostApi); // API çağrısı yapılır
                    const data = await response.json(); // Gelen yanıt JSON olarak parse edilir
                    setUserPosts(data); // Kullanıcının postları state'e kaydedilir
                } catch (error) {
                    console.error("Error fetching user posts:", error); // Hata durumunda konsola yazdırılır
                }
            }
        };
        fetchUserPosts(); // Fonksiyon çağrılır
    }, [user]); // user değiştiğinde tetiklenir
    const headerElement = (
        <div className="inline-flex align-items-center justify-content-center gap-2">
            <span className="font-bold white-space-nowrap">Kullanıcı postları</span>
        </div>
    ); // Dialog'un başlık kısmı

    const footerContent = (
        <div>
            <Button
                label="Ok"
                icon="pi pi-check"
                autoFocus
                onClick={() => setVisible(false)} // Butona tıklandığında dialog kapatılır
            />
        </div>
    ); // Dialog'un alt kısmı
    return (
        <div>

            <Dialog
                visible={visible} // Dialog görünürlüğü kontrol edilir
                modal // Dialog modal yapılır
                header={headerElement} // Dialog başlık kısmı
                footer={footerContent} // Dialog alt kısmı
                style={{ width: "50rem" }} // Dialog genişliği
                onHide={() => setVisible(false)} // Dialog kapatıldığında görünürlüğü false yapar
            >
                {userPosts.map((post) => (
                    <div key={post.id}>
                        <h3>{post.title}</h3>
                        <p>{post.body}</p>
                    </div>
                )
                )}
            </Dialog>

        </div>
    )
}
