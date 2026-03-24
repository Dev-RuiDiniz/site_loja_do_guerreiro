"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { HiOutlinePlus, HiOutlinePencil, HiOutlineTrash, HiOutlineEye, HiOutlineArrowUp, HiOutlineArrowDown } from "react-icons/hi";
import { Modal, ConfirmModal } from "@/components/admin/Modal";
import { ImageUpload } from "@/components/admin/ImageUpload";

interface Banner {
  id: string;
  badge: string | null;
  subtitle: string | null;
  title: string;
  description: string | null;
  image: string | null;
  video: string | null;
  button1Text: string | null;
  button1Link: string | null;
  button1Color: string | null;
  button1Rounded: boolean;
  button2Text: string | null;
  button2Link: string | null;
  button2Color: string | null;
  button2Rounded: boolean;
  order: number;
  active: boolean;
}

const emptyBanner = {
  badge: "",
  subtitle: "",
  title: "",
  description: "",
  image: "",
  video: "",
  button1Text: "Conhecer Produtos",
  button1Link: "/produtos",
  button1Color: "white",
  button1Rounded: false,
  button2Text: "",
  button2Link: "",
  button2Color: "outline",
  button2Rounded: false,
  order: 0,
  active: true,
};

export default function BannersPage() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState<Banner | null>(null);
  const [formData, setFormData] = useState(emptyBanner);
  const [saving, setSaving] = useState(false);

  useEffect(() => { fetchBanners(); }, []);

  const fetchBanners = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/banners");
      const data = await res.json();
      setBanners(data.banners || []);
    } catch (error) { console.error("Error:", error); }
    finally { setLoading(false); }
  };

  const openCreate = () => {
    setSelectedBanner(null);
    setFormData({ ...emptyBanner, order: banners.length });
    setModalOpen(true);
  };

  const openEdit = (banner: Banner) => {
    setSelectedBanner(banner);
    setFormData({
      badge: banner.badge || "",
      subtitle: banner.subtitle || "",
      title: banner.title,
      description: banner.description || "",
      image: banner.image || "",
      video: banner.video || "",
      button1Text: banner.button1Text || "",
      button1Link: banner.button1Link || "",
      button1Color: banner.button1Color || "white",
      button1Rounded: banner.button1Rounded,
      button2Text: banner.button2Text || "",
      button2Link: banner.button2Link || "",
      button2Color: banner.button2Color || "outline",
      button2Rounded: banner.button2Rounded,
      order: banner.order,
      active: banner.active,
    });
    setModalOpen(true);
  };

  const openView = (banner: Banner) => { setSelectedBanner(banner); setViewModalOpen(true); };
  const openDelete = (banner: Banner) => { setSelectedBanner(banner); setDeleteModalOpen(true); };

  const handleSave = async () => {
    setSaving(true);
    try {
      const url = selectedBanner ? `/api/admin/banners/${selectedBanner.id}` : "/api/admin/banners";
      const method = selectedBanner ? "PUT" : "POST";
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(formData) });
      if (res.ok) { setModalOpen(false); fetchBanners(); }
    } catch (error) { console.error("Error:", error); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    if (!selectedBanner) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/banners/${selectedBanner.id}`, { method: "DELETE" });
      if (res.ok) { setDeleteModalOpen(false); fetchBanners(); }
    } catch (error) { console.error("Error:", error); }
    finally { setSaving(false); }
  };

  const moveOrder = async (banner: Banner, direction: "up" | "down") => {
    const idx = banners.findIndex(b => b.id === banner.id);
    const newIdx = direction === "up" ? idx - 1 : idx + 1;
    if (newIdx < 0 || newIdx >= banners.length) return;

    const other = banners[newIdx];
    await Promise.all([
      fetch(`/api/admin/banners/${banner.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...banner, order: other.order }) }),
      fetch(`/api/admin/banners/${other.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...other, order: banner.order }) }),
    ]);
    fetchBanners();
  };

  return (
    <div className="space-y-8">
      <div className="admin-panel rounded-[2rem] p-6 lg:p-7">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="admin-kicker">Vitrine</p>
            <h1 className="mt-2 font-serif text-4xl text-[var(--admin-ink)]">Banners</h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--admin-muted)]">
              Organize a narrativa do hero como campanha ativa, com ordem, status e leitura clara da vitrine.
            </p>
          </div>
          <button onClick={openCreate} className="flex items-center gap-2 rounded-full bg-[var(--color-primary)] px-5 py-2.5 text-sm font-medium text-[var(--color-primary-foreground)] shadow-[0_14px_32px_rgba(16,37,107,0.16)] transition-all hover:-translate-y-0.5 hover:brightness-110">
          <HiOutlinePlus className="h-4 w-4" />
          Novo Banner
        </button>
        </div>
      </div>

      {/* Banners List */}
      <div className="space-y-4">
        {loading ? (
          <div className="admin-panel rounded-[1.6rem] py-12 text-center text-sm text-[var(--admin-muted)]">Carregando vitrine...</div>
        ) : banners.length === 0 ? (
          <div className="admin-panel rounded-[1.6rem] border-2 border-dashed border-[var(--admin-border)] py-12 text-center">
            <p className="mb-4 font-serif text-3xl text-[var(--admin-ink)]">Nenhum banner cadastrado</p>
            <p className="text-sm text-[var(--admin-muted)]">O hero mostrara o conteudo padrao ate voce adicionar banners.</p>
          </div>
        ) : (
          banners.map((banner, idx) => (
            <div key={banner.id} className="admin-panel group flex items-center gap-4 rounded-[1.6rem] p-4 transition-colors">
              {/* Order Controls */}
              <div className="flex flex-col gap-1">
                <button onClick={() => moveOrder(banner, "up")} disabled={idx === 0} className="admin-action flex h-8 w-8 items-center justify-center text-[var(--admin-muted)] disabled:opacity-30">
                  <HiOutlineArrowUp className="h-4 w-4" />
                </button>
                <button onClick={() => moveOrder(banner, "down")} disabled={idx === banners.length - 1} className="admin-action flex h-8 w-8 items-center justify-center text-[var(--admin-muted)] disabled:opacity-30">
                  <HiOutlineArrowDown className="h-4 w-4" />
                </button>
              </div>

              {/* Thumbnail */}
              <div className="relative h-20 w-32 flex-shrink-0 overflow-hidden rounded-[1rem] border border-[var(--admin-border)] bg-[color:rgba(198,161,91,0.08)]">
                {banner.image ? (
                  <Image src={banner.image} alt={banner.title} fill className="object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-xs text-[var(--admin-muted)]">Sem imagem</div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  {banner.badge && <span className="admin-badge px-2 py-0.5 text-xs">{banner.badge}</span>}
                  <span className={`admin-badge px-2 py-0.5 text-xs ${banner.active ? "admin-badge-success" : "admin-badge-muted"}`}>
                    {banner.active ? "Ativo" : "Inativo"}
                  </span>
                </div>
                <h3 className="truncate font-medium text-[var(--admin-ink)]">{banner.title}</h3>
                {banner.subtitle && <p className="truncate text-sm text-[var(--admin-muted)]">{banner.subtitle}</p>}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => openView(banner)} className="admin-action flex h-9 w-9 items-center justify-center text-[var(--admin-muted)]"><HiOutlineEye className="h-4 w-4" /></button>
                <button onClick={() => openEdit(banner)} className="admin-action flex h-9 w-9 items-center justify-center text-[var(--admin-muted)]"><HiOutlinePencil className="h-4 w-4" /></button>
                <button onClick={() => openDelete(banner)} className="admin-action flex h-9 w-9 items-center justify-center text-[var(--admin-danger)]"><HiOutlineTrash className="h-4 w-4" /></button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Create/Edit Modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={selectedBanner ? "Editar Banner" : "Novo Banner"} size="xl">
        <div className="space-y-6">
          {/* Badge & Subtitle */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="mb-2 block text-sm font-medium text-[var(--admin-ink)]">Badge (opcional)</label>
              <input type="text" value={formData.badge} onChange={(e) => setFormData({ ...formData, badge: e.target.value })} placeholder="Ex: Distribuidor Exclusivo" className="admin-input w-full px-4 py-2.5" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-[var(--admin-ink)]">Subtitulo</label>
              <input type="text" value={formData.subtitle} onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })} placeholder="Ex: A referencia mundial em design" className="admin-input w-full px-4 py-2.5" />
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[var(--admin-ink)]">Titulo *</label>
                        <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="Ex: Colecao Ori" className="admin-input w-full px-4 py-2.5 text-xl" />
          </div>

          {/* Description */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[var(--admin-ink)]">Descricao</label>
            <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={3} placeholder="Texto descritivo do banner..." className="admin-input w-full resize-none px-4 py-2.5" />
          </div>

          {/* Buttons */}
          <div className="space-y-4 rounded-[1.4rem] border border-[var(--admin-border)] bg-[color:rgba(198,161,91,0.08)] p-4">
            <h3 className="text-sm font-medium text-[var(--admin-ink)]">Botao Principal</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="mb-1 block text-xs text-[var(--admin-muted)]">Texto</label>
                <input type="text" value={formData.button1Text} onChange={(e) => setFormData({ ...formData, button1Text: e.target.value })} placeholder="Conhecer Produtos" className="admin-input w-full px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="mb-1 block text-xs text-[var(--admin-muted)]">Link</label>
                <input type="text" value={formData.button1Link} onChange={(e) => setFormData({ ...formData, button1Link: e.target.value })} placeholder="/produtos" className="admin-input w-full px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="mb-1 block text-xs text-[var(--admin-muted)]">Estilo</label>
                <select value={formData.button1Color} onChange={(e) => setFormData({ ...formData, button1Color: e.target.value })} className="admin-input w-full px-3 py-2 text-sm">
                  <option value="white">Branco (Sólido)</option>
                  <option value="black">Preto (Sólido)</option>
                  <option value="outline">Outline (Transparente)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-4 rounded-[1.4rem] border border-[var(--admin-border)] bg-[color:rgba(198,161,91,0.08)] p-4">
            <h3 className="text-sm font-medium text-[var(--admin-ink)]">Botao Secundario (opcional)</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="mb-1 block text-xs text-[var(--admin-muted)]">Texto</label>
                <input type="text" value={formData.button2Text} onChange={(e) => setFormData({ ...formData, button2Text: e.target.value })} placeholder="Assistir Video" className="admin-input w-full px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="mb-1 block text-xs text-[var(--admin-muted)]">Link</label>
                <input type="text" value={formData.button2Link} onChange={(e) => setFormData({ ...formData, button2Link: e.target.value })} placeholder="#video" className="admin-input w-full px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="mb-1 block text-xs text-[var(--admin-muted)]">Estilo</label>
                <select value={formData.button2Color} onChange={(e) => setFormData({ ...formData, button2Color: e.target.value })} className="admin-input w-full px-3 py-2 text-sm">
                  <option value="outline">Outline (Transparente)</option>
                  <option value="white">Branco (Sólido)</option>
                  <option value="black">Preto (Sólido)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Image */}
          <ImageUpload label="Imagem de Fundo *" value={formData.image} onChange={(url) => setFormData({ ...formData, image: url })} folder="banners" />

          {/* Video (optional) */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[var(--admin-ink)]">URL do Video (opcional)</label>
            <input type="text" value={formData.video} onChange={(e) => setFormData({ ...formData, video: e.target.value })} placeholder="https://youtube.com/..." className="admin-input w-full px-4 py-2.5" />
          </div>

          {/* Active */}
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={formData.active} onChange={(e) => setFormData({ ...formData, active: e.target.checked })} className="accent-black" />
            <span className="text-sm text-[var(--admin-muted)]">Banner ativo</span>
          </label>

          {/* Actions */}
          <div className="flex justify-end gap-3 border-t border-[var(--admin-border)] pt-4">
            <button onClick={() => setModalOpen(false)} className="admin-action px-6 py-2.5 text-sm font-medium">Cancelar</button>
            <button onClick={handleSave} disabled={saving || !formData.title} className="rounded-full bg-[var(--color-primary)] px-6 py-2.5 text-sm font-medium text-[var(--color-primary-foreground)] disabled:opacity-50">{saving ? "Salvando..." : "Salvar"}</button>
          </div>
        </div>
      </Modal>

      {/* View Modal */}
      <Modal open={viewModalOpen} onClose={() => setViewModalOpen(false)} title="Prévia do Banner" size="xl">
        {selectedBanner && (
          <div className="relative h-80 w-full overflow-hidden rounded-[1.6rem] bg-[var(--color-primary)]">
            {selectedBanner.image && <Image src={selectedBanner.image} alt={selectedBanner.title} fill className="object-cover opacity-60" />}
            <div className="absolute inset-0 flex items-center p-8">
              <div className="max-w-lg text-white">
                {selectedBanner.badge && <span className="mb-4 inline-block rounded-full border border-white/30 bg-white/20 px-3 py-1 text-xs backdrop-blur-sm">{selectedBanner.badge}</span>}
                {selectedBanner.subtitle && <p className="mb-2 text-sm text-white/70">{selectedBanner.subtitle}</p>}
                <h2 className="mb-4 text-4xl font-serif font-semibold">{selectedBanner.title}</h2>
                {selectedBanner.description && <p className="mb-6 text-sm text-white/80">{selectedBanner.description}</p>}
                <div className="flex gap-3">
                  {selectedBanner.button1Text && (
                    <button className={`rounded-full px-4 py-2 text-sm font-medium ${selectedBanner.button1Color === "white" ? "bg-white text-black" : selectedBanner.button1Color === "black" ? "bg-black text-white" : "border border-white/80 text-white"}`}>
                      {selectedBanner.button1Text}
                    </button>
                  )}
                  {selectedBanner.button2Text && (
                    <button className={`rounded-full px-4 py-2 text-sm font-medium ${selectedBanner.button2Color === "white" ? "bg-white text-black" : selectedBanner.button2Color === "black" ? "bg-black text-white" : "border border-white/80 text-white"}`}>
                      {selectedBanner.button2Text}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Modal */}
      <ConfirmModal open={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} onConfirm={handleDelete} title="Excluir Banner" message={`Excluir o banner "${selectedBanner?.title}"?`} confirmText="Excluir" loading={saving} />
    </div>
  );
}
