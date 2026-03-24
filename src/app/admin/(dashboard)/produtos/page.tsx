"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { HiOutlinePlus, HiOutlinePencil, HiOutlineTrash, HiOutlineEye, HiOutlineSearch, HiOutlineCog, HiX, HiOutlineLink } from "react-icons/hi";
import { Modal, ConfirmModal } from "@/components/admin/Modal";
import { ImageUpload, GalleryUpload } from "@/components/admin/ImageUpload";
import SEOFields from "@/components/admin/SEOFields";
import SEOIndicator from "@/components/admin/SEOIndicator";

// Rich Text Editor Component
function RichTextEditor({ value, onChange, rows = 4, placeholder }: { value: string; onChange: (v: string) => void; rows?: number; placeholder?: string }) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [savedSelection, setSavedSelection] = useState<Range | null>(null);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || "";
    }
  }, [value]);

  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    handleInput();
  };

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const saveSelection = () => {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      setSavedSelection(sel.getRangeAt(0).cloneRange());
    }
  };

  const restoreSelection = () => {
    if (savedSelection) {
      const sel = window.getSelection();
      sel?.removeAllRanges();
      sel?.addRange(savedSelection);
    }
  };

  const handleLink = () => {
    saveSelection();
    setLinkUrl("");
    setShowLinkModal(true);
  };

  const insertLink = () => {
    restoreSelection();
    if (linkUrl) {
      execCommand("createLink", linkUrl);
    }
    setShowLinkModal(false);
  };

  return (
    <div className="overflow-hidden rounded-[1.3rem] border border-[var(--admin-border)] bg-[color:rgba(255,255,255,0.18)]">
      <div className="flex items-center gap-1 border-b border-[var(--admin-border)] bg-[color:rgba(198,161,91,0.08)] p-2">
        <button
          type="button"
          onClick={() => execCommand("bold")}
          className="rounded-full p-1.5 text-sm font-bold text-[var(--admin-ink)] transition-colors hover:bg-[color:rgba(198,161,91,0.16)]"
          title="Negrito (Ctrl+B)"
        >
          B
        </button>
        <button
          type="button"
          onClick={() => execCommand("italic")}
          className="rounded-full p-1.5 text-sm italic text-[var(--admin-ink)] transition-colors hover:bg-[color:rgba(198,161,91,0.16)]"
          title="Itálico (Ctrl+I)"
        >
          I
        </button>
        <button
          type="button"
          onClick={() => execCommand("underline")}
          className="rounded-full p-1.5 text-sm underline text-[var(--admin-ink)] transition-colors hover:bg-[color:rgba(198,161,91,0.16)]"
          title="Sublinhado (Ctrl+U)"
        >
          U
        </button>
        <div className="mx-1 h-5 w-px bg-[var(--admin-border)]" />
        <button
          type="button"
          onClick={handleLink}
          className="rounded-full p-1.5 text-sm text-[var(--admin-ink)] transition-colors hover:bg-[color:rgba(198,161,91,0.16)]"
          title="Inserir Link"
        >
          <HiOutlineLink className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => execCommand("unlink")}
          className="rounded-full p-1.5 text-xs text-[var(--admin-danger)] transition-colors hover:bg-[color:rgba(138,47,63,0.12)]"
          title="Remover Link"
        >
          ✕
        </button>
      </div>
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onBlur={handleInput}
        className="min-h-[80px] max-w-none px-4 py-3 text-[var(--admin-ink)] focus:outline-none prose prose-sm"
        style={{ minHeight: rows * 24 + 20 }}
        data-placeholder={placeholder}
      />
      {showLinkModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--admin-overlay)] p-4" onClick={() => setShowLinkModal(false)}>
          <div className="admin-panel-strong w-80 rounded-[1.4rem] p-4" onClick={e => e.stopPropagation()}>
            <h4 className="mb-3 font-medium text-[var(--admin-ink)]">Inserir Link</h4>
            <input
              type="url"
              value={linkUrl}
              onChange={e => setLinkUrl(e.target.value)}
              placeholder="https://exemplo.com"
              className="admin-input mb-3 w-full px-3 py-2"
              autoFocus
            />
            <div className="flex gap-2 justify-end">
              <button type="button" onClick={() => setShowLinkModal(false)} className="admin-action px-3 py-1.5 text-sm">
                Cancelar
              </button>
              <button type="button" onClick={insertLink} className="rounded-full bg-[var(--color-primary)] px-3 py-1.5 text-sm text-[var(--color-primary-foreground)]">
                Inserir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

interface Product {
  id: string;
  name: string;
  slug: string;
  shortDescription: string | null;
  description: string | null;
  features: string[];
  image: string | null;
  gallery: string[];
  specifications?: Array<{ label: string; value: string }>;
  catalog: string | null;
  warranty: string | null;
  featured: boolean;
  active: boolean;
  category: { id: string; name: string } | null;
  categories: { category: { id: string; name: string } }[];
  metaTitle: string | null;
  metaDescription: string | null;
  metaKeywords: string | null;
  ogImage: string | null;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  parentId?: string | null;
  parent?: Category | null;
  children?: Category[];
}

const emptyProduct = {
  name: "",
  slug: "",
  shortDescription: "",
  description: "",
  features: [] as string[],
  specifications: [] as { label: string; value: string }[],
  image: "",
  gallery: [] as string[],
  catalog: "",
  warranty: "",
  video: "",
  featured: false,
  active: true,
  categoryIds: [] as string[],
  metaTitle: "",
  metaDescription: "",
  metaKeywords: "",
  ogImage: "",
};

export default function ProdutosPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [modalOpen, setModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState(emptyProduct);
  const [saving, setSaving] = useState(false);
  const [featureInput, setFeatureInput] = useState("");
  const [specLabel, setSpecLabel] = useState("");
  const [specValue, setSpecValue] = useState("");
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryParentId, setNewCategoryParentId] = useState<string | null>(null);
  const [savingCategory, setSavingCategory] = useState(false);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/products?page=${page}&search=${search}`);
      const data = await res.json();
      setProducts(data.products || []);
      setTotalPages(data.pagination?.totalPages || 1);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/admin/categories");
      const data = await res.json();
      setCategories(data.categories || []);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [fetchProducts]);

  const openCreate = () => {
    setSelectedProduct(null);
    setFormData(emptyProduct);
    setModalOpen(true);
  };

  const openEdit = (product: Product) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      slug: product.slug,
      shortDescription: product.shortDescription || "",
      description: product.description || "",
      features: product.features || [],
      specifications:
        product.specifications?.map((specification) => ({
          label: specification.label,
          value: specification.value,
        })) || [],
      image: product.image || "",
      gallery: product.gallery || [],
      catalog: product.catalog || "",
      warranty: product.warranty || "",
      video: "",
      featured: product.featured,
      active: product.active,
      categoryIds: product.categories?.map((c) => c.category.id) || (product.category?.id ? [product.category.id] : []),
      metaTitle: product.metaTitle || "",
      metaDescription: product.metaDescription || "",
      metaKeywords: product.metaKeywords || "",
      ogImage: product.ogImage || "",
    });
    setModalOpen(true);
  };

  const openView = (product: Product) => {
    setSelectedProduct(product);
    setViewModalOpen(true);
  };

  const openDelete = (product: Product) => {
    setSelectedProduct(product);
    setDeleteModalOpen(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const url = selectedProduct
        ? `/api/admin/products/${selectedProduct.id}`
        : "/api/admin/products";
      const method = selectedProduct ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setModalOpen(false);
        fetchProducts();
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedProduct) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/products/${selectedProduct.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setDeleteModalOpen(false);
        fetchProducts();
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setSaving(false);
    }
  };

  const addFeature = () => {
    if (featureInput.trim()) {
      setFormData({ ...formData, features: [...formData.features, featureInput.trim()] });
      setFeatureInput("");
    }
  };

  const removeFeature = (index: number) => {
    setFormData({ ...formData, features: formData.features.filter((_, i) => i !== index) });
  };

  const addSpec = () => {
    if (specLabel.trim() && specValue.trim()) {
      setFormData({ 
        ...formData, 
        specifications: [...formData.specifications, { label: specLabel.trim(), value: specValue.trim() }] 
      });
      setSpecLabel("");
      setSpecValue("");
    }
  };

  const removeSpec = (index: number) => {
    setFormData({ ...formData, specifications: formData.specifications.filter((_, i) => i !== index) });
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) return;
    setSavingCategory(true);
    try {
      const res = await fetch("/api/admin/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          name: newCategoryName.trim(),
          slug: generateSlug(newCategoryName.trim()),
          parentId: newCategoryParentId
        }),
      });
      if (res.ok) {
        fetchCategories();
        setNewCategoryName("");
        setNewCategoryParentId(null);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setSavingCategory(false);
    }
  };

  // Helper para obter categorias principais (sem parent)
  const rootCategories = categories.filter(c => !c.parentId);
  
  const handleDeleteCategory = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir esta categoria?")) return;
    try {
      const res = await fetch(`/api/admin/categories/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchCategories();
        if (formData.categoryIds.includes(id)) {
          setFormData({ ...formData, categoryIds: formData.categoryIds.filter(cId => cId !== id) });
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="admin-panel rounded-[2rem] p-6 lg:p-7">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="admin-kicker">Catalogo</p>
            <h1 className="mt-2 font-serif text-4xl text-[var(--admin-ink)]">Produtos</h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--admin-muted)]">
              Gerencie pecas, categorias, SEO e leitura do acervo em uma superficie mais clara para decisao rapida.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setCategoryModalOpen(true)}
            className="admin-action flex items-center gap-2 px-4 py-2.5 text-sm"
            title="Gerenciar categorias"
          >
            <HiOutlineCog className="w-5 h-5" />
            Categorias
          </button>
          <button
            onClick={openCreate}
            className="flex items-center gap-2 rounded-full bg-[var(--color-primary)] px-5 py-2.5 text-sm font-medium text-[var(--color-primary-foreground)] shadow-[0_14px_32px_rgba(16,37,107,0.16)] transition-all hover:-translate-y-0.5 hover:brightness-110"
          >
            <HiOutlinePlus className="h-4 w-4" />
            Novo Produto
          </button>
        </div>
        </div>
      </div>

      {/* Search */}
      <div className="admin-panel rounded-[1.7rem] p-4">
        <div className="relative max-w-xl">
          <HiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--admin-muted)]" />
          <input
            type="text"
            placeholder="Buscar produtos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="admin-input w-full py-3 pl-11 pr-4 text-sm"
          />
        </div>
      </div>

      {/* Table */}
      <div className="admin-panel overflow-hidden rounded-[1.8rem]">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[var(--admin-border)] bg-[color:rgba(198,161,91,0.08)]">
              <th className="px-6 py-4 text-left text-[11px] font-medium uppercase tracking-[0.24em] text-[var(--admin-muted)]">Produto</th>
              <th className="px-6 py-4 text-left text-[11px] font-medium uppercase tracking-[0.24em] text-[var(--admin-muted)]">Categoria</th>
              <th className="px-6 py-4 text-left text-[11px] font-medium uppercase tracking-[0.24em] text-[var(--admin-muted)]">SEO</th>
              <th className="px-6 py-4 text-left text-[11px] font-medium uppercase tracking-[0.24em] text-[var(--admin-muted)]">Status</th>
              <th className="px-6 py-4 text-right text-[11px] font-medium uppercase tracking-[0.24em] text-[var(--admin-muted)]">Acoes</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="px-6 py-16 text-center text-sm text-[var(--admin-muted)]">Carregando catalogo...</td>
              </tr>
            ) : products.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-16 text-center">
                  <div className="mx-auto max-w-md">
                    <p className="font-serif text-3xl text-[var(--admin-ink)]">Nenhum produto encontrado</p>
                    <p className="mt-3 text-sm leading-6 text-[var(--admin-muted)]">
                      Ajuste a busca ou cadastre a primeira peca para iniciar o catalogo.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.id} className="admin-table-row">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-[1rem] border border-[var(--admin-border)] bg-[color:rgba(198,161,91,0.08)]">
                        {product.image && (
                          <Image src={product.image} alt={product.name} width={48} height={48} className="object-cover h-full w-full" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-[var(--admin-ink)]">{product.name}</p>
                        <p className="text-sm text-[var(--admin-muted)]">{product.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-[var(--admin-muted)]">
                    {product.categories?.length > 0 
                      ? product.categories.map(c => c.category.name).join(", ")
                      : product.category?.name || "-"}
                  </td>
                  <td className="px-6 py-4">
                    <SEOIndicator metaTitle={product.metaTitle} metaDescription={product.metaDescription} />
                  </td>
                  <td className="px-6 py-4">
                    <span className={`admin-badge inline-flex px-2.5 py-1 text-[10px] uppercase tracking-[0.22em] font-medium ${
                      product.active
                        ? "admin-badge-success"
                        : "admin-badge-muted"
                    }`}>
                      {product.active ? "Ativo" : "Inativo"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => openView(product)} className="admin-action flex h-9 w-9 items-center justify-center text-[var(--admin-muted)]">
                        <HiOutlineEye className="h-4 w-4" />
                      </button>
                      <button onClick={() => openEdit(product)} className="admin-action flex h-9 w-9 items-center justify-center text-[var(--admin-muted)]">
                        <HiOutlinePencil className="h-4 w-4" />
                      </button>
                      <button onClick={() => openDelete(product)} className="admin-action flex h-9 w-9 items-center justify-center text-[var(--admin-danger)]">
                        <HiOutlineTrash className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`admin-action h-10 w-10 text-sm ${
                p === page
                  ? "border-[var(--admin-accent)] bg-[var(--admin-accent)] text-[var(--color-primary)]"
                  : ""
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      )}

      {/* Create/Edit Modal */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={selectedProduct ? "Editar Produto" : "Novo Produto"}
        size="xl"
      >
        <div className="space-y-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-[var(--admin-ink)]">Nome *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  name: e.target.value,
                  slug: generateSlug(e.target.value),
                });
              }}
              className="admin-input w-full px-4 py-2.5"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[var(--admin-ink)]">Descricao Curta</label>
            <RichTextEditor
              value={formData.shortDescription}
              onChange={(v) => setFormData({ ...formData, shortDescription: v })}
              rows={2}
              placeholder="Descrição curta do produto..."
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[var(--admin-ink)]">Descricao Completa</label>
            <RichTextEditor
              value={formData.description}
              onChange={(v) => setFormData({ ...formData, description: v })}
              rows={6}
              placeholder="Descrição completa do produto..."
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[var(--admin-ink)]">Categorias</label>
            <div className="space-y-4 rounded-[1.4rem] border border-[var(--admin-border)] bg-[color:rgba(198,161,91,0.08)] p-4">
              {categories.length === 0 ? (
                <p className="text-sm text-[var(--admin-muted)]">Nenhuma categoria cadastrada</p>
              ) : (
                rootCategories.map((cat) => (
                  <div key={cat.id} className="space-y-2">
                    <label
                      className={`flex cursor-pointer items-center gap-2 rounded-[1rem] px-3 py-2.5 transition-colors ${
                        formData.categoryIds.includes(cat.id)
                          ? "border border-[var(--admin-accent)] bg-[var(--admin-accent)] text-[var(--color-primary)]"
                          : "border border-[var(--admin-border)] bg-[var(--admin-panel)] text-[var(--admin-ink)] hover:border-[var(--admin-border-strong)]"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={formData.categoryIds.includes(cat.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData({ ...formData, categoryIds: [...formData.categoryIds, cat.id] });
                          } else {
                            setFormData({ ...formData, categoryIds: formData.categoryIds.filter((id) => id !== cat.id) });
                          }
                        }}
                        className="sr-only"
                      />
                      <span className="text-sm font-medium">{cat.name}</span>
                    </label>
                    {cat.children && cat.children.length > 0 && (
                      <div className="ml-4 flex flex-wrap gap-2">
                        {cat.children.map((sub) => (
                          <label
                            key={sub.id}
                            className={`flex cursor-pointer items-center gap-2 rounded-full px-3 py-1.5 text-xs transition-colors ${
                              formData.categoryIds.includes(sub.id)
                                ? "border border-[var(--admin-accent)] bg-[var(--admin-accent)] text-[var(--color-primary)]"
                                : "border border-[var(--admin-border)] bg-[var(--admin-panel)] text-[var(--admin-ink)] hover:border-[var(--admin-border-strong)]"
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={formData.categoryIds.includes(sub.id)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setFormData({ ...formData, categoryIds: [...formData.categoryIds, sub.id] });
                                } else {
                                  setFormData({ ...formData, categoryIds: formData.categoryIds.filter((id) => id !== sub.id) });
                                }
                              }}
                              className="sr-only"
                            />
                            <span>↳ {sub.name}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[var(--admin-ink)]">Caracteristicas</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={featureInput}
                onChange={(e) => setFeatureInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addFeature())}
                placeholder="Digite uma característica..."
                className="admin-input flex-1 px-4 py-2 text-sm"
              />
              <button
                type="button"
                onClick={addFeature}
                className="rounded-full bg-[var(--color-primary)] px-4 py-2 text-sm text-[var(--color-primary-foreground)]"
              >
                Adicionar
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.features.map((feature, index) => (
                <span key={index} className="admin-badge inline-flex items-center gap-1 px-3 py-1.5 text-sm">
                  {feature}
                  <button type="button" onClick={() => removeFeature(index)} className="ml-1 text-[var(--admin-muted)] hover:text-[var(--admin-danger)]">×</button>
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[var(--admin-ink)]">Informacoes Tecnicas</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={specLabel}
                onChange={(e) => setSpecLabel(e.target.value)}
                placeholder="Ex: Dimensões"
                className="admin-input flex-1 px-4 py-2 text-sm"
              />
              <input
                type="text"
                value={specValue}
                onChange={(e) => setSpecValue(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSpec())}
                placeholder="Ex: 60x80x120cm"
                className="admin-input flex-1 px-4 py-2 text-sm"
              />
              <button
                type="button"
                onClick={addSpec}
                className="rounded-full bg-[var(--color-primary)] px-4 py-2 text-sm text-[var(--color-primary-foreground)]"
              >
                Adicionar
              </button>
            </div>
            <div className="space-y-2">
              {formData.specifications.map((spec, index) => (
                <div key={index} className="admin-badge flex items-center justify-between px-3 py-2 text-sm">
                  <span><strong>{spec.label}:</strong> {spec.value}</span>
                  <button type="button" onClick={() => removeSpec(index)} className="text-[var(--admin-muted)] hover:text-[var(--admin-danger)]">×</button>
                </div>
              ))}
            </div>
          </div>

          <ImageUpload
            label="Imagem Principal"
            value={formData.image}
            onChange={(url) => setFormData(prev => ({ ...prev, image: url }))}
            folder="products"
          />

          <GalleryUpload
            label="Galeria de Imagens"
            value={formData.gallery}
            onChange={(urls) => setFormData(prev => ({ ...prev, gallery: urls }))}
            folder="products"
          />

          <ImageUpload
            label="Catálogo Técnico (PDF ou Imagem)"
            value={formData.catalog}
            onChange={(url) => setFormData(prev => ({ ...prev, catalog: url }))}
            folder="catalogs"
            accept="application/pdf,image/*"
          />

          <div>
            <label className="mb-1 block text-sm font-medium text-[var(--admin-ink)]">
              Garantia
            </label>
            <input
              type="text"
              value={formData.warranty}
              onChange={(e) => setFormData({ ...formData, warranty: e.target.value })}
              placeholder="Ex: 2 anos"
              className="admin-input w-full px-4 py-2.5 text-sm"
            />
          </div>

          <SEOFields
            metaTitle={formData.metaTitle}
            metaDescription={formData.metaDescription}
            metaKeywords={formData.metaKeywords}
            ogImage={formData.ogImage}
            slug={`produtos/${formData.slug}`}
            onChange={(field, value) => setFormData({ ...formData, [field]: value })}
          />

          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.active}
                onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                className="accent-black"
              />
              <span className="text-sm text-[var(--admin-muted)]">Ativo</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="accent-black"
              />
              <span className="text-sm text-[var(--admin-muted)]">Destaque</span>
            </label>
          </div>

          <div className="flex justify-end gap-3 border-t border-[var(--admin-border)] pt-4">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="admin-action px-6 py-2.5 text-sm font-medium"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={saving || !formData.name}
              className="rounded-full bg-[var(--color-primary)] px-6 py-2.5 text-sm font-medium text-[var(--color-primary-foreground)] hover:brightness-110 disabled:opacity-50"
            >
              {saving ? "Salvando..." : "Salvar"}
            </button>
          </div>
        </div>
      </Modal>

      {/* View Modal */}
      <Modal
        open={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
        title={selectedProduct?.name || "Produto"}
        size="lg"
      >
        {selectedProduct && (
          <div className="space-y-6">
            {selectedProduct.image && (
              <div className="relative h-64 w-full overflow-hidden rounded-[1.4rem] border border-[var(--admin-border)] bg-[color:rgba(198,161,91,0.08)]">
                <Image src={selectedProduct.image} alt={selectedProduct.name} fill className="object-cover" />
              </div>
            )}
            <div>
              <h3 className="mb-1 text-sm font-medium text-[var(--admin-muted)]">Descricao</h3>
              <p className="text-[var(--admin-ink)]">{selectedProduct.shortDescription || "-"}</p>
            </div>
            <div>
              <h3 className="mb-1 text-sm font-medium text-[var(--admin-muted)]">Categoria</h3>
              <p className="text-[var(--admin-ink)]">{selectedProduct.category?.name || "-"}</p>
            </div>
            <div>
              <h3 className="mb-1 text-sm font-medium text-[var(--admin-muted)]">Caracteristicas</h3>
              <ul className="list-disc list-inside text-[var(--admin-ink)]">
                {selectedProduct.features?.map((f, i) => <li key={i}>{f}</li>) || "-"}
              </ul>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Confirm Modal */}
      <ConfirmModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Excluir Produto"
        message={`Tem certeza que deseja excluir "${selectedProduct?.name}"? Esta ação não pode ser desfeita.`}
        confirmText="Excluir"
        loading={saving}
      />

      {/* Category Management Modal */}
      {categoryModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[var(--admin-overlay)]" onClick={() => setCategoryModalOpen(false)} />
          <div className="admin-panel-strong relative w-full max-w-lg rounded-[1.6rem] p-6">
            <button
              onClick={() => setCategoryModalOpen(false)}
              className="admin-action absolute right-4 top-4 flex h-10 w-10 items-center justify-center text-[var(--admin-muted)]"
            >
              <HiX className="w-5 h-5" />
            </button>

            <p className="admin-kicker">Taxonomia</p>
            <h3 className="mb-6 mt-2 font-serif text-3xl text-[var(--admin-ink)]">Gerenciar Categorias</h3>

            <div className="mb-4 space-y-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleAddCategory()}
                  placeholder="Nome da categoria..."
                  className="admin-input flex-1 px-4 py-2 text-sm"
                />
                <button
                  onClick={handleAddCategory}
                  disabled={savingCategory || !newCategoryName.trim()}
                  className="rounded-full bg-[var(--color-primary)] px-4 py-2 text-sm text-[var(--color-primary-foreground)] disabled:opacity-50"
                >
                  {savingCategory ? "..." : "Adicionar"}
                </button>
              </div>
              <select
                value={newCategoryParentId || ""}
                onChange={(e) => setNewCategoryParentId(e.target.value || null)}
                className="admin-input w-full px-4 py-2 text-sm"
              >
                <option value="">Categoria principal (sem pai)</option>
                {rootCategories.map((cat) => (
                  <option key={cat.id} value={cat.id}>Subcategoria de: {cat.name}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1 max-h-72 overflow-y-auto">
              {categories.length === 0 ? (
                <p className="py-4 text-center text-sm text-[var(--admin-muted)]">Nenhuma categoria cadastrada</p>
              ) : (
                rootCategories.map((cat) => (
                  <div key={cat.id}>
                    <div className="admin-badge flex items-center justify-between rounded-[1rem] px-3 py-2.5">
                      <span className="text-sm font-medium text-[var(--admin-ink)]">{cat.name}</span>
                      <button
                        onClick={() => handleDeleteCategory(cat.id)}
                        className="text-[var(--admin-muted)] transition-colors hover:text-[var(--admin-danger)]"
                      >
                        <HiOutlineTrash className="w-4 h-4" />
                      </button>
                    </div>
                    {cat.children && cat.children.length > 0 && (
                      <div className="ml-4 border-l-2 border-[var(--admin-border)]">
                        {cat.children.map((sub) => (
                          <div key={sub.id} className="flex items-center justify-between px-3 py-2">
                            <span className="text-sm text-[var(--admin-muted)]">↳ {sub.name}</span>
                            <button
                              onClick={() => handleDeleteCategory(sub.id)}
                              className="text-[var(--admin-muted)] transition-colors hover:text-[var(--admin-danger)]"
                            >
                              <HiOutlineTrash className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
