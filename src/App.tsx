/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { 
  Search, 
  ChevronUp, 
  LayoutGrid, 
  BrainCircuit, 
  Palette, 
  GraduationCap, 
  Code2, 
  Share2, 
  Video, 
  LineChart,
  ExternalLink,
  Bot
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Tool {
  name: string;
  category: string;
  description: string;
  url: string;
  iconType: string;
}

const tools: Tool[] = [
  { name: "ChatGPT", category: "الذكاء الاصطناعي", description: "مساعد ذكي للمحادثة والإجابة على التساؤلات", url: "https://chat.openai.com", iconType: "Bot" },
  { name: "Gemini", category: "الذكاء الاصطناعي", description: "نموذج جوجل المتطور للذكاء الاصطناعي", url: "https://gemini.google.com", iconType: "BrainCircuit" },
  { name: "Google AI Studio", category: "الذكاء الاصطناعي", description: "منصة تطوير تطبيقات الذكاء الاصطناعي", url: "https://aistudio.google.com", iconType: "Code2" },
  { name: "NotebookLM", category: "الذكاء الاصطناعي", description: "مفكرة ذكية تعتمد على مصادرك الخاصة", url: "https://notebooklm.google.com", iconType: "GraduationCap" },
  { name: "Canva", category: "التصميم", description: "منصة عالمية للتصميم الجرافيكي السهل", url: "https://www.canva.com", iconType: "Palette" },
  { name: "Copilot", category: "الذكاء الاصطناعي", description: "مساعد مايكروسوفت الذكي للإنتاجية", url: "https://copilot.microsoft.com", iconType: "Bot" },
  { name: "Claude", category: "الذكاء الاصطناعي", description: "ذكاء اصطناعي متطور في النصوص والبرمجة", url: "https://claude.ai", iconType: "BrainCircuit" },
  { name: "Perplexity", category: "الذكاء الاصطناعي", description: "محرك بحث ذكي يقدم إجابات موثقة", url: "https://www.perplexity.ai", iconType: "Search" },
  { name: "Google Drive", category: "التواصل والتخزين", description: "تخزين ومشاركة الملفات سحابياً", url: "https://drive.google.com", iconType: "Share2" },
  { name: "Gmail", category: "التواصل والتخزين", description: "خدمة البريد الإلكتروني الرائدة من جوجل", url: "https://mail.google.com", iconType: "Share2" },
  { name: "Facebook", category: "التواصل والتخزين", description: "شبكة التواصل الاجتماعي العالمية", url: "https://www.facebook.com", iconType: "Share2" },
  { name: "Padlet", category: "التعليم", description: "حائط تفاعلي لمشاركة الأنشطة التعليمية", url: "https://padlet.com", iconType: "LayoutGrid" },
  { name: "Zoom", category: "التواصل والتخزين", description: "منصة للفصول والاجتماعات الافتراضية", url: "https://zoom.us", iconType: "Video" },
  { name: "Tinkercad", category: "البرمجة والروبوتيك", description: "تصميم ثلاثي الأبعاد ومحاكاة الدوائر", url: "https://www.tinkercad.com", iconType: "Code2" },
  { name: "Arduino IDE", category: "البرمجة والروبوتيك", description: "بيئة برمجة لوحات الأردوينو", url: "https://www.arduino.cc/en/software", iconType: "Code2" },
  { name: "Pictoblox", category: "البرمجة والروبوتيك", description: "تعلم البرمجة والذكاء الاصطناعي للأطفال", url: "https://thestempedia.com/product/pictoblox", iconType: "Code2" },
  { name: "PhET", category: "التعليم", description: "محاكاة تفاعلية للعلوم والرياضيات", url: "https://phet.colorado.edu", iconType: "GraduationCap" },
  { name: "Quizizz", category: "التعليم", description: "منصة لإنشاء المسابقات التعليمية التفاعلية", url: "https://quizizz.com", iconType: "GraduationCap" },
  { name: "Kahoot", category: "التعليم", description: "أشهر منصة للألعاب التعليمية التنافسية", url: "https://kahoot.com", iconType: "GraduationCap" },
  { name: "Wordwall", category: "التعليم", description: "إنشاء أنشطة تعليمية متنوعة بسرعة", url: "https://wordwall.net", iconType: "GraduationCap" },
  { name: "Notion", category: "التنظيم والإنتاجية", description: "مساحة عمل متكاملة للملاحظات والمشاريع", url: "https://www.notion.so", iconType: "LineChart" },
  { name: "n8n", category: "التنظيم والإنتاجية", description: "أتمتة سير العمل والربط بين الأدوات", url: "https://n8n.io", iconType: "Code2" },
  { name: "Skywork", category: "الذكاء الاصطناعي", description: "أداة ذكاء اصطناعي متطورة للبحث", url: "https://www.skywork.cn", iconType: "Bot" },
  { name: "Krea", category: "الفيديو والصوت", description: "توليد وتحسين الصور والرسومات بالذكاء الاصطناعي", url: "https://www.krea.ai", iconType: "Palette" },
  { name: "Recraft", category: "التصميم", description: "إنشاء أيقونات ورسوم متجهة بالذكاء الاصطناعي", url: "https://www.recraft.ai", iconType: "Palette" },
  { name: "Kling", category: "الفيديو والصوت", description: "توليد فيديوهات احترافية بالذكاء الاصطناعي", url: "https://klingai.com", iconType: "Video" },
  { name: "Pika", category: "الفيديو والصوت", description: "تحويل النصوص إلى فيديوهات إبداعية", url: "https://pika.art", iconType: "Video" },
  { name: "Runway", category: "الفيديو والصوت", description: "أدوات متطورة لتحرير وتوليد الفيديو", url: "https://runwayml.com", iconType: "Video" },
  { name: "CapCut", category: "الفيديو والصوت", description: "تطبيق سهل وقوي لتحرير الفيديوهات", url: "https://www.capcut.com", iconType: "Video" },
  { name: "YouTube", category: "الفيديو والصوت", description: "أكبر منصة لمشاركة الفيديوهات في العالم", url: "https://www.youtube.com", iconType: "Video" },
];

const ToolIcon = ({ type }: { type: string }) => {
  switch (type) {
    case "Bot": return <Bot className="w-8 h-8" />;
    case "BrainCircuit": return <BrainCircuit className="w-8 h-8" />;
    case "Code2": return <Code2 className="w-8 h-8" />;
    case "GraduationCap": return <GraduationCap className="w-8 h-8" />;
    case "Palette": return <Palette className="w-8 h-8" />;
    case "Search": return <Search className="w-8 h-8" />;
    case "Share2": return <Share2 className="w-8 h-8" />;
    case "Video": return <Video className="w-8 h-8" />;
    case "LineChart": return <LineChart className="w-8 h-8" />;
    default: return <LayoutGrid className="w-8 h-8" />;
  }
};

const categories = [
  "الكل",
  "الذكاء الاصطناعي",
  "التصميم",
  "التعليم",
  "البرمجة والروبوتيك",
  "التواصل والتخزين",
  "الفيديو والصوت",
  "التنظيم والإنتاجية"
];

const CategoryIcon = ({ cat }: { cat: string }) => {
  switch (cat) {
    case "الذكاء الاصطناعي": return <BrainCircuit className="w-4 h-4 ml-2" />;
    case "التصميم": return <Palette className="w-4 h-4 ml-2" />;
    case "التعليم": return <GraduationCap className="w-4 h-4 ml-2" />;
    case "البرمجة والروبوتيك": return <Code2 className="w-4 h-4 ml-2" />;
    case "التواصل والتخزين": return <Share2 className="w-4 h-4 ml-2" />;
    case "الفيديو والصوت": return <Video className="w-4 h-4 ml-2" />;
    case "التنظيم والإنتاجية": return <LineChart className="w-4 h-4 ml-2" />;
    default: return <LayoutGrid className="w-4 h-4 ml-2" />;
  }
};

export default function App() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("الكل");

  const filteredTools = useMemo(() => {
    return tools.filter(tool => {
      const matchesSearch = tool.name.toLowerCase().includes(search.toLowerCase()) || 
                           tool.description.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = activeCategory === "الكل" || tool.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-royal-blue elegant-dots flex flex-col items-center" dir="rtl">
      {/* Top Zellij Border */}
      <div className="zellij-border"></div>

      {/* Header Section */}
      <header className="w-full relative pt-12 pb-20 overflow-hidden flex flex-col items-center text-center border-b-[1px] border-moroccan-gold/30">
        {/* Subtle Moroccan Pattern Background */}
        <div className="absolute inset-0 opacity-5 pointer-events-none zellige-pattern"></div>
        
        {/* Moroccan Arch Glow */}
        <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-48 h-12 bg-royal-blue border-t-2 border-x-2 border-moroccan-gold rounded-t-full z-10 hidden md:block"></div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-20 px-4"
        >
          <div className="mb-4 inline-block px-4 py-1.5 bg-moroccan-gold text-royal-blue rounded-full text-sm font-bold shadow-lg">
            سليم المختار
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 tracking-tight">
            منصتي الذكية للأدوات الرقمية والذكاء الاصطناعي
          </h1>
          <p className="text-lg md:text-xl text-text-gold/80 max-w-3xl mx-auto leading-relaxed font-light">
            فضاء تفاعلي يجمع أدوات التعليم، الإبداع، البرمجة، والذكاء الاصطناعي
          </p>
          <div className="mt-6 font-medium text-moroccan-gold opacity-60 text-sm">
            مدرب تكنولوجيا التعليم والذكاء الاصطناعي
          </div>
        </motion.div>
      </header>

      {/* Main Content */}
      <main className="w-full max-w-7xl px-4 mt-8 relative z-20 pb-20">
        
        {/* Control Bar (Search & Filter) */}
        <div className="flex flex-col lg:flex-row gap-6 items-center mb-12 bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-sm">
          {/* Search Input */}
          <div className="relative w-full lg:w-80">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-moroccan-gold/50 w-4 h-4" />
            <input 
              type="text" 
              placeholder="ابحث عن أداة..." 
              className="w-full pr-10 pl-4 py-2 bg-white/5 border border-moroccan-gold/20 rounded-lg focus:ring-1 focus:ring-moroccan-gold focus:border-moroccan-gold outline-none transition-all text-white placeholder:text-white/20 text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 justify-center flex-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex items-center px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 border ${
                  activeCategory === cat 
                    ? 'bg-moroccan-gold text-royal-blue border-moroccan-gold shadow-lg shadow-moroccan-gold/20' 
                    : 'bg-white/5 text-text-gold border-white/10 hover:border-moroccan-gold/50 hover:bg-white/10'
                }`}
              >
                <CategoryIcon cat={cat} />
                {cat}
              </button>
            ))}
          </div>

          <div className="text-xs text-text-gold/40 font-medium whitespace-nowrap">
             عرض <span className="text-white font-bold">{filteredTools.length}</span> أداة
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <AnimatePresence mode='popLayout'>
            {filteredTools.map((tool) => (
              <motion.a
                key={tool.name}
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                whileHover={{ y: -4 }}
                className="group block"
              >
                <article className="tool-card p-4 h-full flex items-center gap-4 relative overflow-hidden">
                  {/* Icon Area */}
                  <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center group-hover:bg-moroccan-red group-hover:text-white text-moroccan-gold transition-all duration-500 border border-white/5">
                    <ToolIcon type={tool.iconType} />
                  </div>

                  {/* Text Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-white mb-0.5 flex items-center gap-1 group-hover:text-moroccan-gold transition-colors">
                      {tool.name}
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h3>
                    <p className="text-white/40 text-[10px] leading-tight line-clamp-1 mb-1">
                      {tool.description}
                    </p>
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-white/5 text-text-gold/60 border border-white/5 uppercase tracking-wide">
                      {tool.category}
                    </span>
                  </div>

                  {/* Subtle Background Pattern Accent */}
                  <div className="absolute -bottom-2 -left-2 w-8 h-8 opacity-5 pointer-events-none group-hover:rotate-45 transition-transform">
                     <svg viewBox="0 0 24 24" className="w-full h-full text-moroccan-gold fill-current">
                        <path d="M12 2L4.5 20.29L5.21 21L12 18L18.79 21L19.5 20.29L12 2Z" />
                     </svg>
                  </div>
                </article>
              </motion.a>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredTools.length === 0 && (
          <div className="text-center py-20 bg-white/5 rounded-3xl border-2 border-dashed border-white/10 backdrop-blur-sm">
             <Search className="w-12 h-12 text-white/10 mx-auto mb-4" />
             <p className="text-xl text-text-gold/60">عذراً، لم نجد نتائج تطابق بحثك</p>
             <button 
                onClick={() => {setSearch(""); setActiveCategory("الكل");}}
                className="mt-4 text-moroccan-gold font-bold hover:text-white transition-colors"
             >
                إعادة ضبط البحث
             </button>
          </div>
        )}
      </main>

      {/* Footer Section */}
      <footer className="w-full mt-auto relative overflow-hidden flex flex-col items-center">
        <div className="w-full py-10 bg-royal-blue/80 backdrop-blur-sm border-t border-white/5 relative z-10 text-center">
           <div className="absolute inset-0 opacity-5 zellige-pattern pointer-events-none"></div>
           <p className="text-xs md:text-sm text-text-gold/40 max-w-xl mx-auto px-4 mb-4">
            صمم هذا الفضاء الرقمي لدعم الإبداع، التعلم، والتجديد التربوي. منصة متكاملة لمدرب تكنولوجيا التعليم سليم المختار.
          </p>
          <div className="flex justify-center items-center gap-4 text-moroccan-gold font-bold text-xs uppercase tracking-widest">
            <div className="w-8 h-[1px] bg-moroccan-gold/20"></div>
            <span>سليم المختار 2026</span>
            <div className="w-8 h-[1px] bg-moroccan-gold/20"></div>
          </div>
        </div>
        {/* Bottom Zellij Border */}
        <div className="zellij-border"></div>
      </footer>

      {/* Scroll Top Button */}
      <button 
        onClick={scrollToTop}
        className="fixed bottom-8 left-8 bg-moroccan-gold/20 backdrop-blur-md text-moroccan-gold p-3 rounded-full shadow-lg hover:bg-moroccan-gold hover:text-royal-blue transition-all duration-300 hover:scale-110 z-50 border border-moroccan-gold/30"
      >
        <ChevronUp className="w-5 h-5" />
      </button>
    </div>
  );
}
