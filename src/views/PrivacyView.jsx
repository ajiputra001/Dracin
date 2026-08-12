import React from 'react';
import { ArrowLeft, ShieldCheck, Mail, Globe, Lock } from 'lucide-react';

export default function PrivacyView({ onBack }) {
  return (
    <div className="pb-24 space-y-6 animate-in fade-in duration-300">
      
      <div className="flex items-center gap-3">
        <button 
          onClick={onBack}
          className="p-2.5 rounded-2xl bg-slate-900 border border-slate-800 text-white hover:bg-slate-800 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-xl font-black text-white flex items-center gap-2">
            <Lock className="w-5 h-5 text-amber-400" />
            Kebijakan Privasi (Privacy Policy)
          </h1>
          <p className="text-xs text-slate-400">Terakhir Diperbarui: 4 Februari 2026</p>
        </div>
      </div>

      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-5 text-xs text-slate-300 leading-relaxed">
        
        <p className="font-semibold text-slate-200">
          PaleviDev mengoperasikan aplikasi S-DRACIN. Halaman ini memberi tahu Anda tentang kebijakan kami terkait pengumpulan, penggunaan, dan pengungkapan data pribadi saat Anda menggunakan Layanan kami.
        </p>

        <section className="space-y-2">
          <h3 className="text-sm font-bold text-white flex items-center gap-1.5 text-amber-400">
            1. Pengumpulan dan Penggunaan Informasi
          </h3>
          <p>
            Saat menggunakan Aplikasi kami, kami dapat mengumpulkan informasi yang dapat digunakan untuk menghubungi atau mengidentifikasi Anda, terutama untuk fitur Chat Global:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-400">
            <li><b>Identitas Pengguna:</b> Username, Email, dan URL Foto Profil.</li>
            <li><b>Data Chat:</b> Pesan yang dikirim melalui Chat Global disimpan untuk ditampilkan secara real-time.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h3 className="text-sm font-bold text-white flex items-center gap-1.5 text-amber-400">
            2. Interaksi Chat Global
          </h3>
          <p>
            Setiap informasi atau konten yang Anda unggah secara sukarela di Chat Global menjadi konsumsi publik. Username dan foto Anda akan terlihat oleh semua pengguna.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="text-sm font-bold text-white flex items-center gap-1.5 text-amber-400">
            3. Layanan Pihak Ketiga
          </h3>
          <ul className="list-disc pl-5 space-y-1 text-slate-400">
            <li><b>Pusher:</b> Untuk pengiriman pesan real-time.</li>
            <li><b>MongoDB:</b> Untuk basis data pengguna.</li>
            <li><b>Vercel:</b> Untuk pemrosesan backend.</li>
            <li><b>Flutter & Web:</b> Untuk pengolahan tampilan antarmuka.</li>
          </ul>
        </section>

        <section className="space-y-2 pt-2 border-t border-slate-800">
          <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
            <Mail className="w-4 h-4 text-red-400" />
            Kontak Kami
          </h3>
          <p className="text-slate-400">
            Email: <a href="mailto:cshelper.sdracin@gmail.com" className="text-amber-400 font-bold hover:underline">cshelper.sdracin@gmail.com</a><br/>
            Website: <a href="https://github.com/MrPalevi/S-DRACIN" target="_blank" rel="noreferrer" className="text-amber-400 font-bold hover:underline">https://github.com/MrPalevi/S-DRACIN</a>
          </p>
        </section>

      </div>

    </div>
  );
}
