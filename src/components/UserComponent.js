import { Button } from "primereact/button"; // PrimeReact kütüphanesinden bir buton bileşeni.
import { Dialog } from "primereact/dialog"; // PrimeReact kütüphanesinden bir dialog (açılır pencere) bileşeni.
import { InputText } from "primereact/inputtext"; // PrimeReact kütüphanesinden bir metin girişi bileşeni.
import { Toolbar } from "primereact/toolbar"; // PrimeReact kütüphanesinden bir araç çubuğu bileşeni.
import React, { useState } from "react"; // React ve useState hook'u.
import { Toast } from "primereact/toast"; // PrimeReact kütüphanesinden bir toast (bildirim) bileşeni.
import DataTableComponent from "./DataTableComponent";

export default function UserComponent({ addUser, users, setUsers }) {
  // UserComponent fonksiyonu. addUser, users ve setUsers prop olarak alır.
  const [submitted, setSubmitted] = useState(false); // submitted durumunu yönetmek için useState hook'u.
  const [userDialog, setUserDialog] = useState(false); // userDialog durumunu yönetmek için useState hook'u.
  const [selectedUsers, setSelectedUsers] = useState(null); // seçili kullanıcıları yönetmek için useState hook'u.
  const [deleteUserDialog, setDeleteUserDialog] = useState(false); // deleteUserDialog durumunu yönetmek için useState hook'u.
  const [newUser, setNewUser] = useState({
    // yeni kullanıcı durumunu yönetmek için useState hook'u.
    name: "",
    username: "",
  });
  const toast = React.useRef(null); // toast bileşeni için referans oluşturma.

  const openNew = () => {
    // Yeni kullanıcı ekleme dialog'unu açar.
    setNewUser({ name: "", username: "" });
    setSubmitted(false);
    setUserDialog(true);
  };

  const hideDialog = () => {
    // Dialog'u kapatır.
    setSubmitted(false);
    setUserDialog(false);
  };

  const saveUser = () => {
    // Kullanıcıyı kaydeder.
    setSubmitted(true);
    if (newUser.name.trim() && newUser.username.trim()) {
      // Eğer isim ve kullanıcı adı doluysa kullanıcı eklenir.
      addUser(newUser);
      setUserDialog(false);
      setNewUser({ name: "", username: "" });
    }
  };

  const confirmDeleteSelected = () => {
    // Seçili kullanıcıları silmek için onay dialog'unu açar.
    setDeleteUserDialog(true);
  };

  const deleteUser = () => {
    // Seçili kullanıcıları siler.
    const remainingUsers = users.filter(
      (user) => !selectedUsers.includes(user)
    );
    setUsers(remainingUsers); // Kalan kullanıcıları günceller.
    setDeleteUserDialog(false);
    setSelectedUsers(null);
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "Users Deleted",
      life: 3000,
    });
  };

  const leftToolbarTemplate = () => {
    // Araç çubuğunun sol tarafı için şablon.
    return (
      <div className="flex flex-wrap gap-2">
        <Button
          label="Add"
          icon="pi pi-plus"
          severity="success"
          onClick={openNew}
        />
        <Button
          label="Delete"
          icon="pi pi-trash"
          severity="danger"
          onClick={confirmDeleteSelected}
          disabled={!selectedUsers || !selectedUsers.length}
        />
      </div>
    );
  };

  const rightToolbarTemplate = () => {
    // Araç çubuğunun sağ tarafı için şablon.
    return (
      <Button label="Export" icon="pi pi-upload" className="p-button-help" />
    );
  };

  return (
    <>
      <Toast ref={toast} /> {/* Bildirim göstermek için Toast bileşeni */}
      <Toolbar
        className="mb-4"
        left={leftToolbarTemplate}
        right={rightToolbarTemplate}
      ></Toolbar>
      <DataTableComponent
        users={users}
        onSelectionChange={setSelectedUsers}
      ></DataTableComponent>
      <Dialog
        visible={userDialog} // Dialog görünürlüğü
        style={{ width: "32rem" }} // Dialog genişliği
        header="User Details" // Dialog başlığı
        modal // Modal dialog
        className="p-fluid" // Akışkan stil sınıfı
        footer={
          // Dialog altbilgisi
          <div>
            <Button label="Cancel" icon="pi pi-times" onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" onClick={saveUser} />
          </div>
        }
        onHide={hideDialog} // Dialog gizlendiğinde tetiklenir
      >
        <div className="field">
          <label htmlFor="name">Name</label>
          <InputText
            id="name"
            value={newUser.name} // İsim değeri
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} // İsim değiştiğinde yeni kullanıcıyı günceller
            required // Gerekli alan
            autoFocus // Otomatik odak
            className={submitted && !newUser.name ? "p-invalid" : ""} // Geçersiz durum sınıfı
          />
          {submitted && !newUser.name && (
            <small className="p-error">Name is required.</small>
          )}
        </div>
        <div className="field">
          <label htmlFor="username">Username</label>
          <InputText
            id="username"
            value={newUser.username} // Kullanıcı adı değeri
            onChange={(e) =>
              setNewUser({ ...newUser, username: e.target.value })
            } // Kullanıcı adı değiştiğinde yeni kullanıcıyı günceller
            required // Gerekli alan
            className={submitted && !newUser.username ? "p-invalid" : ""} // Geçersiz durum sınıfı
          />
          {submitted && !newUser.username && (
            <small className="p-error">Username is required.</small>
          )}
        </div>
      </Dialog>
      <Dialog
        visible={deleteUserDialog} // Silme dialog görünürlüğü
        style={{ width: "450px" }} // Dialog genişliği
        header="Confirm" // Dialog başlığı
        modal // Modal dialog
        footer={
          // Dialog altbilgisi
          <div>
            <Button
              label="No"
              icon="pi pi-times"
              onClick={() => setDeleteUserDialog(false)}
            />
            <Button label="Yes" icon="pi pi-check" onClick={deleteUser} />
          </div>
        }
        onHide={() => setDeleteUserDialog(false)} // Dialog gizlendiğinde tetiklenir
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          {selectedUsers && selectedUsers.length > 0 && (
            <span>Are you sure you want to delete the selected users?</span>
          )}
        </div>
      </Dialog>
    </>
  );
}
