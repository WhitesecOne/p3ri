// docs/SECURITY.md §11 (UU PDP): notice tujuan pengumpulan data & siapa yang mengakses.
export function PdpNotice() {
  return (
    <p className="text-xs leading-relaxed text-muted-foreground">
      Data yang Anda kirim hanya digunakan pengurus P3RI untuk menindaklanjuti permintaan ini dan tidak dibagikan ke pihak ketiga. Anda dapat meminta penghapusan data kapan saja melalui email sekretariat.
    </p>
  )
}

export function Honeypot() {
  return (
    <div className="absolute -left-[9999px] top-0" aria-hidden>
      <label htmlFor="website">Website</label>
      <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
    </div>
  )
}
