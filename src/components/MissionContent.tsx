import type { Mission } from "@/lib/missions-data";
import { Section } from "./Section";
import { stripEmoji } from "@/lib/text";

interface MissionContentProps {
  mission: Mission;
}

const GOLD = "#ffd700";
const GOLD_SOFT = "rgba(255,215,0,0.08)";
const GOLD_BORDER = "rgba(255,215,0,0.25)";

export function MissionContent({ mission }: MissionContentProps) {
  return (
    <div className="space-y-3">
      {/* Income Phases */}
      {mission.incomePhases && mission.incomePhases.length > 0 && (
        <Section title="Thu nhập & KPI" count={mission.incomePhases.length} defaultOpen>
          {mission.incomePhases.map((phase, i) => (
            <div key={i} className="rounded-xl border p-4" style={{ borderColor: GOLD_BORDER, backgroundColor: GOLD_SOFT }}>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: GOLD_SOFT, color: GOLD }}>
                {stripEmoji(phase.phase)} · {stripEmoji(phase.period)}
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <InfoRow label="Lương cơ bản" value={phase.baseSalary} />
                <InfoRow label="Hoa hồng" value={phase.commission} />
                <InfoRow label="KPI tối thiểu" value={phase.kpiMin} />
                <InfoRow label="KPI mục tiêu" value={phase.kpiTarget} />
                <InfoRow label="Hoa hồng / đơn" value={phase.commissionPerDeal} />
                <InfoRow label="Thu nhập ước tính" value={phase.estimatedIncome} highlight />
                {phase.bonus && <InfoRow label="Bonus vượt KPI" value={phase.bonus} />}
              </div>
              <div className="mt-3 rounded-lg p-3" style={{ backgroundColor: GOLD_SOFT }}>
                <p className="text-xs text-gray-300">
                  <span className="font-semibold" style={{ color: GOLD }}>Trọng tâm:</span>{" "}
                  {stripEmoji(phase.focus)}
                </p>
              </div>
            </div>
          ))}
        </Section>
      )}

      {/* Work Rules */}
      {mission.workRules && mission.workRules.length > 0 && (
        <Section title="Quy tắc làm việc" count={mission.workRules.length}>
          {mission.workRules.map((rule, i) => (
            <div key={i} className="rounded-xl border p-4" style={{ borderColor: GOLD_BORDER }}>
              <h4 className="mb-2 text-sm font-bold text-white">{stripEmoji(rule.rule)}</h4>
              <p className="text-sm text-gray-300">{stripEmoji(rule.detail)}</p>
            </div>
          ))}
        </Section>
      )}

      {/* Scenarios */}
      {mission.scenarios && mission.scenarios.length > 0 && (
        <Section title="Kịch bản xử lý khách" count={mission.scenarios.length}>
          <div className="rounded-lg p-3" style={{ backgroundColor: GOLD_SOFT }}>
            <p className="text-sm font-medium" style={{ color: GOLD }}>
              Phong cách bán hàng cốt lõi: Chuyên gia giáo dục khách hàng
            </p>
            <p className="mt-1 text-xs text-gray-300">
              Không chiều khách, không ép mua — dẫn dắt khách tự nhận ra vấn đề và tự muốn mua.
            </p>
          </div>
          {mission.scenarios.map((sc, i) => (
            <div key={i} className="rounded-xl border p-4" style={{ borderColor: GOLD_BORDER }}>
              <h4 className="mb-3 text-sm font-bold text-white">{stripEmoji(sc.title)}</h4>
              <div className="space-y-2">
                <Block label="Khách nói">
                  <p className="text-sm italic text-white">"{stripEmoji(sc.customerSays)}"</p>
                </Block>
                <Block label="Sale phản hồi" gold>
                  <p className="text-sm text-white">{stripEmoji(sc.saleResponse)}</p>
                </Block>
                <Block label="Mục đích">
                  <p className="text-sm text-gray-300">{stripEmoji(sc.purpose)}</p>
                </Block>
              </div>
            </div>
          ))}
        </Section>
      )}

      {/* FAQs */}
      {mission.faqs && mission.faqs.length > 0 && (
        <Section title="Câu hỏi thường gặp" count={mission.faqs.length}>
          {mission.faqs.map((faq, i) => (
            <div key={i} className="rounded-xl border p-4" style={{ borderColor: GOLD_BORDER }}>
              <h4 className="mb-2 text-sm font-bold text-white">
                Câu {i + 1}: {stripEmoji(faq.question)}
              </h4>
              <Block label="Trả lời chuẩn" gold>
                <p className="text-sm text-white">{stripEmoji(faq.answer)}</p>
              </Block>
              <p className="mt-2 text-xs text-gray-400">
                <span className="font-semibold">Ghi chú:</span> {stripEmoji(faq.note)}
              </p>
            </div>
          ))}
        </Section>
      )}

      {/* Rejections */}
      {mission.rejections && mission.rejections.length > 0 && (
        <Section title="Xử lý từ chối" count={mission.rejections.length}>
          {mission.rejections.map((rej, i) => (
            <div key={i} className="rounded-xl border p-4" style={{ borderColor: GOLD_BORDER }}>
              <h4 className="mb-2 text-sm font-bold text-white">
                Từ chối {i + 1}: {stripEmoji(rej.type)}
              </h4>
              <Block label="Cách xử lý">
                <p className="text-sm text-white">{stripEmoji(rej.handling)}</p>
              </Block>
              <div className="mt-2">
                <Block label="Câu nói mẫu" gold>
                  <p className="text-sm text-white">{stripEmoji(rej.samplePhrase)}</p>
                </Block>
              </div>
            </div>
          ))}
        </Section>
      )}

      {/* Lead Sources */}
      {mission.leadSources && mission.leadSources.length > 0 && (
        <Section title="Nguồn lead đang khai thác" count={mission.leadSources.length}>
          <ul className="space-y-2">
            {mission.leadSources.map((src, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-white">
                <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: GOLD }} />
                {stripEmoji(src)}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* Sale Steps */}
      {mission.saleSteps && mission.saleSteps.length > 0 && (
        <Section title="Quy trình bán hàng" count={mission.saleSteps.length}>
          {mission.saleSteps.map((step, i) => (
            <div key={i} className="rounded-xl border p-4" style={{ borderColor: GOLD_BORDER }}>
              <h4 className="mb-2 text-sm font-bold text-white">{stripEmoji(step.step)}</h4>
              <p className="mb-3 text-xs text-gray-300">
                <span className="font-semibold" style={{ color: GOLD }}>Mục tiêu:</span> {stripEmoji(step.goal)}
              </p>
              <p className="text-xs font-semibold text-gray-400">Câu mẫu:</p>
              <div className="mt-1 space-y-1">
                {step.samplePhrases.map((phrase, j) => (
                  <p key={j} className="flex items-start gap-2 pl-2 text-sm text-white">
                    <span className="mt-1" style={{ color: GOLD }}>›</span>
                    {stripEmoji(phrase)}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </Section>
      )}

      {/* Downsale */}
      {mission.downsaleStrategy && mission.downsaleStrategy.length > 0 && (
        <Section title="Chiến thuật Downsale" count={mission.downsaleStrategy.length}>
          <ul className="space-y-2">
            {mission.downsaleStrategy.map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-white">
                <span className="mt-0.5" style={{ color: GOLD }}>›</span>
                {stripEmoji(s)}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* Sale Tools */}
      {mission.saleTools && mission.saleTools.length > 0 && (
        <Section title="Công cụ Sale" count={mission.saleTools.length}>
          <div className="overflow-x-auto rounded-xl border" style={{ borderColor: GOLD_BORDER }}>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b" style={{ borderColor: GOLD_BORDER, backgroundColor: GOLD_SOFT }}>
                  <th className="px-4 py-3 text-left font-semibold text-white">Công cụ</th>
                  <th className="px-4 py-3 text-left font-semibold text-white">Mục đích</th>
                  <th className="px-4 py-3 text-left font-semibold text-white">Dùng ở</th>
                </tr>
              </thead>
              <tbody>
                {mission.saleTools.map((tool, i) => (
                  <tr key={i} className="border-b last:border-0" style={{ borderColor: "rgba(255,215,0,0.12)" }}>
                    <td className="px-4 py-3 font-medium" style={{ color: GOLD }}>{stripEmoji(tool.name)}</td>
                    <td className="px-4 py-3 text-white">{stripEmoji(tool.purpose)}</td>
                    <td className="px-4 py-3 text-gray-300">{stripEmoji(tool.usedAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
      )}

      {/* Customer Groups */}
      {mission.customerGroups && mission.customerGroups.length > 0 && (
        <Section title="Nhóm khách hàng" count={mission.customerGroups.length}>
          {mission.customerGroups.map((group, i) => (
            <div key={i} className="rounded-xl border p-4" style={{ borderColor: GOLD_BORDER }}>
              <h4 className="mb-2 text-sm font-bold text-white">{stripEmoji(group.name)}</h4>
              <div className="mb-3 space-y-1">
                <p className="text-xs text-gray-300">
                  <span className="font-semibold text-white">Dấu hiệu:</span> {stripEmoji(group.signs)}
                </p>
                <p className="text-xs text-gray-300">
                  <span className="font-semibold text-white">Trạng thái:</span> {stripEmoji(group.status)}
                </p>
              </div>
              <p className="mb-2 text-xs font-semibold" style={{ color: GOLD }}>Cách phản ứng:</p>
              <div className="space-y-2">
                {group.steps.map((s, j) => (
                  <div key={j} className="rounded-lg bg-black/30 p-3">
                    <p className="text-sm text-white">
                      <span className="font-semibold" style={{ color: GOLD }}>{stripEmoji(s.step)}:</span> {stripEmoji(s.detail)}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-3 rounded-lg p-3" style={{ backgroundColor: GOLD_SOFT }}>
                <p className="text-xs font-semibold" style={{ color: GOLD }}>Quy tắc ghi nhớ 1 dòng:</p>
                <p className="mt-1 text-sm font-medium text-white">{stripEmoji(group.quickRule)}</p>
              </div>
            </div>
          ))}
        </Section>
      )}

      {/* Case Studies */}
      {mission.caseStudies && mission.caseStudies.length > 0 && (
        <Section title="Case Study tham chiếu" count={mission.caseStudies.length}>
          {mission.caseStudies.map((cs, i) => (
            <div key={i} className="rounded-xl border p-4" style={{ borderColor: GOLD_BORDER }}>
              <h4 className="mb-3 text-sm font-bold text-white">Case {i + 1} — {stripEmoji(cs.name)}</h4>
              <div className="grid gap-2 sm:grid-cols-2">
                <InfoRow label="Xuất phát điểm" value={cs.startingPoint} />
                <InfoRow label="Vấn đề" value={cs.problem} />
                <InfoRow label="Kết quả" value={cs.result} />
                <InfoRow label="Dùng khi tư vấn cho" value={cs.useFor} />
              </div>
              <div className="mt-3 rounded-lg p-3" style={{ backgroundColor: GOLD_SOFT }}>
                <p className="text-xs font-semibold" style={{ color: GOLD }}>Câu dẫn vào chuyện:</p>
                <p className="mt-1 text-sm italic text-white">{stripEmoji(cs.leadIn)}</p>
              </div>
            </div>
          ))}
        </Section>
      )}

      {/* Case Quick Ref */}
      {mission.caseQuickRef && mission.caseQuickRef.length > 0 && (
        <Section title="Bảng tra nhanh — dùng case nào cho ai" count={mission.caseQuickRef.length}>
          <div className="space-y-2">
            {mission.caseQuickRef.map((ref, i) => (
              <div key={i} className="flex items-center justify-between gap-2 rounded-lg bg-black/30 px-3 py-2">
                <span className="text-sm text-white">{stripEmoji(ref.customerType)}</span>
                <span className="shrink-0 text-sm font-semibold" style={{ color: GOLD }}>› {stripEmoji(ref.caseName)}</span>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Nurture Stages */}
      {mission.nurtureStages && mission.nurtureStages.length > 0 && (
        <Section title="Chăm sóc khách (Nurture)" count={mission.nurtureStages.length}>
          {mission.nurtureStages.map((stage, i) => (
            <div key={i} className="rounded-xl border p-4" style={{ borderColor: GOLD_BORDER }}>
              <h4 className="mb-2 text-sm font-bold text-white">{stripEmoji(stage.stage)}</h4>
              <div className="space-y-2">
                <Block label="Gửi gì" gold>
                  <p className="text-sm text-white">{stripEmoji(stage.sendWhat)}</p>
                </Block>
                <Block label="Mục đích">
                  <p className="text-sm text-white">{stripEmoji(stage.purpose)}</p>
                </Block>
                {stage.extra && (
                  <p className="text-xs text-gray-300">
                    <span className="font-semibold text-white">Bổ sung sau:</span> {stripEmoji(stage.extra)}
                  </p>
                )}
              </div>
            </div>
          ))}
        </Section>
      )}

      {/* Nurture Rules */}
      {mission.nurtureRules && mission.nurtureRules.length > 0 && (
        <Section title="Quy tắc Nurture cho Sale" count={mission.nurtureRules.length}>
          <ul className="space-y-2">
            {mission.nurtureRules.map((rule, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-white">
                <span className="mt-0.5 font-bold" style={{ color: GOLD }}>{i + 1}.</span>
                {stripEmoji(rule)}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* Daily Checklist */}
      {mission.dailyChecklist && mission.dailyChecklist.length > 0 && (
        <Section title="Checklist công việc hằng ngày" count={mission.dailyChecklist.length}>
          {mission.dailyChecklist.map((block, i) => (
            <div key={i} className="rounded-xl border p-4" style={{ borderColor: GOLD_BORDER }}>
              <h4 className="mb-3 text-sm font-bold text-white">{stripEmoji(block.time)}</h4>
              <ul className="space-y-2">
                {block.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-white">
                    <span
                      className="mt-1 inline-block h-3 w-3 shrink-0 rounded border"
                      style={{ borderColor: GOLD }}
                    />
                    {stripEmoji(item)}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Section>
      )}

      {/* Product Tiers */}
      {mission.productTiers && mission.productTiers.length > 0 && (
        <Section title="Sản phẩm theo tầng" count={mission.productTiers.length}>
          {mission.productTiers.map((tier, i) => (
            <div key={i} className="rounded-xl border p-4" style={{ borderColor: GOLD_BORDER }}>
              <div
                className="mb-3 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold"
                style={{ backgroundColor: GOLD_SOFT, color: GOLD }}
              >
                {stripEmoji(tier.tier)} — {stripEmoji(tier.label)}
              </div>
              <ul className="space-y-2">
                {tier.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-white">
                    <span className="mt-1" style={{ color: GOLD }}>›</span>
                    {item.link ? (
                      <a href={item.link} target="_blank" rel="noopener noreferrer" className="underline" style={{ color: "#bb86fc" }}>
                        {stripEmoji(item.name)}
                      </a>
                    ) : (
                      stripEmoji(item.name)
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Section>
      )}

      {/* Community Links */}
      {mission.communityLinks && mission.communityLinks.length > 0 && (
        <Section title="Cộng đồng" count={mission.communityLinks.length}>
          <div className="flex flex-wrap gap-2">
            {mission.communityLinks.map((link, i) => (
              <a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors hover:bg-yellow-500/10"
                style={{ borderColor: GOLD_BORDER, color: GOLD }}
              >
                {stripEmoji(link.name)} ›
              </a>
            ))}
          </div>
        </Section>
      )}
    </div>
  );
}

function InfoRow({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="rounded-lg bg-black/30 p-3">
      <p className="text-xs font-semibold text-gray-400">{stripEmoji(label)}</p>
      <p className="mt-1 text-sm font-medium" style={{ color: highlight ? GOLD : "#fff" }}>
        {stripEmoji(value)}
      </p>
    </div>
  );
}

function Block({ label, children, gold }: { label: string; children: React.ReactNode; gold?: boolean }) {
  return (
    <div className="rounded-lg p-3" style={{ backgroundColor: gold ? GOLD_SOFT : "rgba(255,255,255,0.03)" }}>
      <p className="text-xs font-semibold" style={{ color: gold ? GOLD : "#9ca3af" }}>{stripEmoji(label)}:</p>
      <div className="mt-1">{children}</div>
    </div>
  );
}