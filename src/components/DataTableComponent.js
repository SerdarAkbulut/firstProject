import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";

import React, { useEffect, useState } from "react";
import UserPostsComponent from "./UserPostsComponent";

export default function DataTableComponent({ users, onSelectionChange }) {
  const [selectedUsers, setSelectedUserss] = useState(null); // Seçili kullanıcıları tutar
  const [visible, setVisible] = useState(false); // Dialog'un görünürlüğünü kontrol eder
  const [user, setUser] = useState(null); // Seçilen kullanıcıyı tutar
  const [userPosts, setUserPosts] = useState([]); // Seçilen kullanıcının postlarını tutar

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

  useEffect(() => {
    if (onSelectionChange) {
      // Eğer onSelectionChange fonksiyonu varsa
      onSelectionChange(selectedUsers); // Seçili kullanıcıları bildirir
    }
  }, [selectedUsers, onSelectionChange]); // selectedUsers veya onSelectionChange değiştiğinde tetiklenir

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
    <>
      <DataTable
        value={users} // Tabloya kullanıcı verisi eklenir
        rowsPerPageOptions={[5, 10, 25, 50]} // Sayfalama seçenekleri
        paginator // Sayfalama özelliği etkinleştirilir
        rows={5} // Her sayfada 5 satır gösterilir
        tableStyle={{ minWidth: "50rem" }} // Tablo stili
        selection={selectedUsers} // Seçili kullanıcılar
        onSelectionChange={(e) => setSelectedUserss(e.value)} // Seçim değiştiğinde state güncellenir
      >
        <Column selectionMode="multiple" exportable={false}></Column>
        seçim sütunu
        <Column field="id" header="ID" style={{ width: "auto" }}></Column>
        <Column field="name" header="Adı" style={{ width: "auto" }}></Column>
        <Column
          field="username"
          header="Kullanıcı Adı"
          style={{ width: "auto" }}
        ></Column>{" "}
        <Column
          body={(dt) => {
            return (
              <Button
                label="Daha Fazla"
                icon="pi pi-info-circle"
                onClick={() => {
                  setUser(dt); // Butona tıklandığında user state'i güncellenir
                  setVisible(true); // Dialog görünür hale gelir
                }}
                autoFocus
              />
            );
          }}
          header="Ayrıntılar"
        ></Column>
      </DataTable>
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
      {/* <UserPostsComponent user={user}></UserPostsComponent> */}
    </>
  );
}
