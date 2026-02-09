import { motion } from "framer-motion";
import { Infinity } from "lucide-react";

const ZubeenTribute = () => {
  return (
    <div className="py-16 px-4 flex flex-col items-center bg-gradient-to-b from-powder-blue/30 to-lavender-mist/50 transition-colors duration-500">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="max-w-4xl text-center bg-midnight-blue/80 p-8 rounded-2xl shadow-lg"
      >
        <h1 className="text-xl sm:text-xl mb-4 leading-relaxed font-serif text-pearl-white">
          বিষ যেন শূণ্যতা! <br />
          অসম আৰু প্ৰতিজন অসমীয়া জুবিন বিহীন শূণ্যতাত…<br />
          সাগৰ তলিত শুই, মনৰ চিলা উৰুৱাই, অসমৰ হিয়া টানি আজুৰি লৈ গ'ল জুবিন।
        </h1>

        <p className="text-base sm:text-base text-pearl-white/90 mb-4 leading-loose">
          In the land where the <strong className="text-vintage-gold">কপৌ ফুল</strong> blooms during{" "}
          <strong className="text-vintage-gold">ব'হাগ বিহু</strong>, where the <strong className="text-vintage-gold">ঢোল</strong> and{" "}
          <strong className="text-vintage-gold">পেঁপা</strong> echo across paddy fields, a voice that carried
          the soul of Assam to every corner of the world. That voice is none
          other than <strong className="text-vintage-gold">Zubeen Garg</strong> — the son of the soil, the
          eternal bard, the restless heart who turned life itself into music.
          <br /><br />
          When he sings of love, it feels like the hush of a{" "}
          <strong className="text-vintage-gold">সুতুলি</strong> on a moonlit night. When he sings of pain, it
          is the cry of a riverbank breaking in floods. When he raises his voice
          in protest, it is the roar of a people refusing to be silenced. His
          art is more than entertainment — it is identity, it is memory, it is
          resistance.
          <br /><br />
          <strong className="text-vintage-gold">Zubeen</strong> remains free, untamed, much like the spirit of
          Assam itself.
        </p>

        <blockquote className="text-lg text-vintage-gold sm:text-xl mb-4 leading-relaxed font-serif italic border-l-4 border-vintage-gold pl-4 text-left">
          মুগ্ধ হিয়া মোৰ কোনে ছুই যায়<br />
          মুগ্ধ হিয়াত ৰৈ কোনে চুমি যায়<br />
          বুকুতে অগনি জ্বলাই<br />
          তেজ—মঙহৰে মৰম নেওচি<br />
          জ্বলি জ্বলি ৰ'ল মাথোঁ ছাই !!
        </blockquote>

        <p className="text-xl sm:text-xl leading-relaxed mb-4 font-serif text-pearl-white">
          পঞ্চভূতত বিলীন আজি জুবিন , অজস্ৰ অনুৰাগীক কান্দোৱাই গ'ল গৈ জোনবাইৰ দেশলৈ…<br />
          প্ৰতিশৰতৰ প্ৰভাতী ফুলে, ক'ব তোমাকেই মোৰ কথা....
          <br /><br />
          <strong className="text-vintage-gold">বিদায় জীৱন বৰঠাকুৰ!</strong>
        </p>

<p className="mt-4 flex items-center justify-center gap-2 text-pearl-white/70 text-sm">
  18/11/2025 —
  <Infinity
    size={18}
    className="text-vintage-gold animate-pulse"
    strokeWidth={1.5}
  />
  <br />
  #ZubeenGarg
</p>

      </motion.div>
    </div>
  );
};

export default ZubeenTribute;
