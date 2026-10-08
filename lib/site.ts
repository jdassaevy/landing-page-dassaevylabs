export const site = {
  name: "Dassaevy Labs",
  url: "https://dassaevylabs.com.br",
  founder: "Julio Dassaevy",
  role: "Founder & Full Stack Developer",
  email: "dassaevylabs@gmail.com",
  whatsapp: "5548999784892",
  linkedin: "https://www.linkedin.com/in/juliodassaevy",
  github: "https://github.com/jdassaevy",
};

export function whatsappUrl(message: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}
