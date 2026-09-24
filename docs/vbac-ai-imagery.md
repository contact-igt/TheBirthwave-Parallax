# VBAC — AI imagery briefs (pending generation)

No image-generation tool was available in the session that built this page, so
every illustration slot below renders as an honest "built visual placeholder"
(gradient panel + caption, the same mechanism `MediaPlaceholder` already uses
site-wide for approved-photography-pending spots) instead of a real file.
Nothing here is a stand-in photograph, a reused image from another service
page, or a relabeled asset — see `src/content/vbac-landing-imagery.ts`'s own
top comment.

When these are generated, follow the exact pattern
`docs/normal-birth-delivery-ai-imagery.md` already established: photorealistic-
natural illustrations, authentic South Asian/Indian casting, warm ivory/rose/
sage/natural-wood daylight palette, no logos/text/watermarks, no surgical or
graphic-birth imagery, no visible medical records, natural hands and faces.
Save the optimised WebP files under `public/images/services/` and replace the
matching `gradient` entry in `vbac-landing-imagery.ts` with a real `src` —
nothing else in any consuming component needs to change (`VbacImage` and the
hero already branch on whether a real `src` exists, the same way
`PortraitPlaceholder` does for clinician photography).

This page's five slots are deliberately distinct subjects from every other
confirmed service illustration set — no VBAC visual here duplicates or
recolours a Normal Birth & Delivery Care or Birth Preparation scene.

## hero

Use case: photorealistic-natural. ONE premium editorial maternity website hero
photograph, wide landscape 16:9. Fictional South Asian Indian expectant
mother, early thirties, warm medium brown skin, dark hair softly loose,
wearing a modest muted ivory maternity dress, seated thoughtfully near a
sunlit window with her partner in a warm rose linen shirt standing gently
beside her, a hand resting on her shoulder. Both subjects in the RIGHTMOST
third of the frame, faces and hands fully visible with comfortable margins.
LEFT 55 percent is quiet, softly lit warm ivory wall and diffused curtain,
uncluttered negative space reserved for a website headline. Calm, reflective
expression — not smiling broadly, more thoughtful and composed, appropriate
for a page about weighing an important decision. Natural oak furniture, muted
sage cushion accent, warm cream palette, soft daylight, authentic skin and
fabric texture, refined professional photography, horizontal wide
composition. Illustrative fictional scene only, no actual clinic or staff
represented. No labour procedure, no surgical scar, no medical equipment, no
nudity, no graphics, no text, no logo, no watermark. Anatomically correct
hands and bodies. Keep both subjects together on the right so the scene crops
well on mobile.

## consultation

Use case: photorealistic-natural. ONE vertical 4:5 editorial maternity
illustration styled as premium natural photography, for a calm one-to-one
maternity-care discussion. Fictional Indian pregnant woman, early thirties,
medium brown skin, shoulder-length dark hair, modest muted ivory kurta,
seated facing a female Indian clinician, mid-forties, wearing a cream
professional jacket over a rose blouse. Both seated at a small pale oak
consultation desk in a light ivory room. Candid, attentive listening,
unhurried expressions. Mother seated left foreground in three-quarter
profile, clinician right midground, both faces fully visible within the
central 75 percent for responsive cropping. Frame from waist upward, simple
hands resting on the table, a closed plain notebook, no readable documents or
charts. Soft side daylight, warm ivory curtains, a small plant in the
background, authentic skin texture, refined quiet editorial photograph. No
actual named clinician or real clinic depicted. No examination, no medical
machinery, no logos, no text or watermark.

## birth-history

Use case: photorealistic-natural. ONE landscape 4:3 editorial illustration for
a reflective birth-history conversation. Fictional Indian woman, early
thirties, warm medium brown skin, seated in a comfortable armchair in a
sunlit ivory room, speaking quietly with a female care professional seated
opposite her. A closed, plain personal notebook rests on the small table
between them — no visible medical charts, forms, scan printouts, or
readable text of any kind. Warm, unhurried, reflective mood; gentle eye
contact; hands resting naturally, not gesturing dramatically. Soft daylight
from a side window, natural oak side table, muted sage cushion, warm cream
and rose palette, authentic skin and fabric texture, quiet documentary-style
photography. Illustrative fictional scene only. No hospital signage, no
medical equipment, no surgical references, no scars, no logos, no text or
watermark.

## planning

Use case: photorealistic-natural. ONE vertical 4:5 editorial illustration for
a birth-preferences planning scene. Fictional pregnant Indian woman in a
modest rose maternity kurta, seated beside her partner in warm ivory linen on
a soft sofa, both looking together at a small open notebook resting on their
laps — pages blank or indistinct, absolutely no readable writing. Gentle,
collaborative body language; a support person's hand resting lightly near
hers, not gripping. Warm afternoon daylight, ivory curtains, natural oak
detailing, muted sage throw, authentic unretouched skin texture, calm candid
photography. No clinician present in this scene — a private planning moment
between the couple only. No medical devices, no clinic setting, no text,
logos, or watermark, no baby present.

## next-steps

Use case: photorealistic-natural. ONE landscape 4:3 editorial illustration for
a warm, practical preparation moment — deliberately set at home rather than
in a clinical space, to read as "getting ready for the next conversation"
rather than a procedure. Fictional Indian pregnant woman in a soft ivory
robe, standing in a sunlit kitchen or living space, calmly packing a small
soft bag on a table with a folded muted-rose blanket and a warm drink beside
her — ordinary, unhurried, practical objects only, nothing medical, nothing
readable. Partner nearby in the background, softly out of focus, in warm
domestic conversation. Natural daylight, warm wood tones, authentic textures,
calm documentary-style photography, no posed smiling at camera. No hospital
bag branding, no medical items, no readable labels or text, no logos or
watermark.
