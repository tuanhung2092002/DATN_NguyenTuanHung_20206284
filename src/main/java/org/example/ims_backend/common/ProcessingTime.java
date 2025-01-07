package org.example.ims_backend.common;

import java.text.SimpleDateFormat;
import java.util.Date;

public class ProcessingTime {

    public static Date calculateOverlapAndNewExpire(Date createA, Date expiredA, Date createB, Date expiredB , Date expiredProject) {
        // Nếu không giao nhau, giữ nguyên expiredB
        if (createB.after(expiredA) || expiredB.before(createA)) {
            return expiredB;
        }

        // Tính thời gian giao nhau
        Date overlapStart = createA.after(createB) ? createA : createB;
        Date overlapEnd = expiredA.before(expiredB) ? expiredA : expiredB;
        long overlapDuration = overlapEnd.getTime() - overlapStart.getTime();

        // Nếu expiredB nhỏ hơn expiredA, lấy mốc xử lý là expiredA
        if (expiredB.before(expiredA)) {
            // expiredB mới dựa trên expiredA + thời gian giao nhau của B
            return new Date(expiredA.getTime() + overlapDuration).before(expiredProject) ? new Date(expiredA.getTime() + overlapDuration) : expiredProject;
        }

        // Trường hợp expiredB lớn hơn hoặc bằng expiredA, cộng thời gian giao
        return new Date(expiredB.getTime() + overlapDuration).before(expiredProject) ? new Date(expiredB.getTime() + overlapDuration) : expiredProject;
    }
    public static void main(String[] args) throws Exception {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date createA = sdf.parse("2025-01-01 10:00:00");
        Date expiredA = sdf.parse("2025-01-03 10:00:00");
        Date createB = sdf.parse("2025-01-01 05:00:00");
        Date expiredB = sdf.parse("2025-01-01 08:00:00");
        Date expiredProject = sdf.parse("2025-01-10 08:00:00");
        System.out.println("expiredB mới: " + calculateOverlapAndNewExpire(createA, expiredA, createB, expiredB,expiredProject));
    }
}
